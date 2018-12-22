//go:generate sqlboiler psql
package postgres

import (
	"context"
	"core/pkg"
	"core/pkg/postgres/models"
	"database/sql"
	"fmt"
	"log"
)

type orderRepository struct {
	ctx context.Context
	db  *sql.DB
}

func (r *orderRepository) Find(id procurement.OrderID) (*procurement.Order, error) {

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

func (r *orderRepository) FindAll() {}
func (r *orderRepository) Create()  {}
func (r *orderRepository) Delete()  {}
func (r *orderRepository) Update()  {}

func NewOrderRepository(db *sql.DB) procurement.OrderRepository {
	return &orderRepository{
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
