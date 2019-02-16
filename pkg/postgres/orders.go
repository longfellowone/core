//go:generate sqlboiler psql
package postgres

import (
	"context"
	"core/pkg"
	"core/pkg/postgres/models"
	"database/sql"
	"fmt"
	"github.com/google/wire"
	"log"
)

var Set = wire.NewSet(
	NewOrderRepository,
	Dial,
)

type OrderRepository struct {
	ctx context.Context
	db  *sql.DB
}

func (r *OrderRepository) Find(id procurement.OrderID) (*procurement.Order, error) {

	one, err := models.Products().One(r.db)
	if err != nil {
		log.Fatal(err)
	}

	fmt.Println(one)

	return &procurement.Order{
		OrderID: 1,
		Project: "Project1",
		Date:    "DEC 18",
		Status:  procurement.Complete,
	}, nil
}

func (r *OrderRepository) FindAll() {}
func (r *OrderRepository) Create()  {}
func (r *OrderRepository) Delete()  {}
func (r *OrderRepository) Update()  {}

func Dial(postgresConnectionString string) *sql.DB {
	db, err := sql.Open("postgres", postgresConnectionString)
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()

	if err = db.Ping(); err != nil {
		log.Fatal(err)
	}
	return db
}

func NewOrderRepository(db *sql.DB) *OrderRepository {
	return &OrderRepository{
		db: db,
	}
}

// type OrderRepository interface {
// 	Find()
// 	FindAll()
// 	Create()
// 	Delete()
// 	Update()
// }
