//go:generate sqlboiler psql --no-context
package postgres

import (
	"context"
	"core/pkg"
	"core/pkg/postgres/models"
	"database/sql"
	"fmt"
	"log"
)

type productRepository struct {
	ctx context.Context
	db  *sql.DB
}

func (r *productRepository) FindAllTest(string procurement.ProductID) (*procurement.Product, error) {

	one, err := models.Products().One(r.db)
	if err != nil {
		log.Fatal(err)
	}

	fmt.Println(string)

	return &procurement.Product{Name: procurement.Name(one.Product)}, nil

}

func (r *productRepository) FindAll() (*[]procurement.Product, error) {

	findAll, err := models.Products().All(r.db)
	if err != nil {
		log.Fatal(err)
	}

	var products []procurement.Product

	for _, v := range findAll {
		products = append(products, procurement.Product{Name: procurement.Name(v.Product)})
	}

	return &products, nil
}

func (r *productRepository) Create() {}
func (r *productRepository) Delete() {}
func (r *productRepository) Update() {}

func NewProductRepository(db *sql.DB) procurement.ProductRepository {
	return &productRepository{
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
