//go:generate sqlboiler psql
package postgres

import (
	"core/pkg"
	"database/sql"
	"errors"
	// core/pkg/postgres/models
)

type OrderRepository struct {
	db *sql.DB
}

//ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
//defer cancel()

func (r *OrderRepository) Find(id procurement.OrderID) (*procurement.Order, error) {
	if id == "1" {
		return &procurement.Order{
			OrderID: "1",
			Project: "Project1",
			Date:    "DEC 18",
			Status:  procurement.Complete,
		}, nil
	}
	return nil, errors.New("cannot find ID")
}

func (r *OrderRepository) FindAll() {}
func (r *OrderRepository) Create()  {}
func (r *OrderRepository) Delete()  {}
func (r *OrderRepository) Update()  {}

func NewOrderRepository(db *sql.DB) (*OrderRepository, error) {
	r := &OrderRepository{
		db: db,
	}

	return r, nil
}

// type OrderRepository interface {
// 	Find()
// 	FindAll()
// 	Create()
// 	Delete()
// 	Update()
// }
