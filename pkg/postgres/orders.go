//go:generate sqlboiler psql
package postgres

import (
	"context"
	"core/pkg"
	"core/pkg/postgres/models"
	"database/sql"
	"errors"
	"fmt"
	"log"
)

type OrderRepository struct {
	ctx context.Context
	db  *sql.DB
}

func (r *OrderRepository) Find(id procurement.OrderID) (*procurement.Order, error) {
	if id == "1" {

		one, err := models.Products().One(r.ctx, r.db)
		if err != nil {
			log.Fatal(err)
		}
		fmt.Println(one)

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

func NewOrderRepository(ctx context.Context, db *sql.DB) (*OrderRepository, error) {
	r := &OrderRepository{
		ctx: ctx,
		db:  db,
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
