//go:generate sqlboiler psql
package postgres

import (
	"context"
	"core/pkg"
	"core/pkg/postgres/models"
	"database/sql"
	"errors"
	"log"
)

type ProductRepository struct {
	ctx context.Context
	db  *sql.DB
}

func (r *ProductRepository) FindAllTest(string procurement.ProductID) (*procurement.Product, error) {
	if string == "1" {

		one, err := models.Products().One(r.ctx, r.db)
		if err != nil {
			log.Fatal(err)
		}

		return &procurement.Product{Name: procurement.Name(one.Product)}, nil
	}
	return nil, errors.New("cannot find ID")
}

func (r *ProductRepository) FindAll() ([]procurement.Product, error) {

	findAll, err := models.Products().All(r.ctx, r.db)
	if err != nil {
		log.Fatal(err)
	}

	var products []procurement.Product

	for _, v := range findAll {
		products = append(products, procurement.Product{Name: procurement.Name(v.Product)})
	}

	//s.results = append(s.results, &pb.Product{Name: r.Str, Uuid: id, Indexes: indexes})

	return products, nil
}

func (r *ProductRepository) Create() {}
func (r *ProductRepository) Delete() {}
func (r *ProductRepository) Update() {}

func NewProductRepository(ctx context.Context, db *sql.DB) (*ProductRepository, error) {
	r := &ProductRepository{
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
