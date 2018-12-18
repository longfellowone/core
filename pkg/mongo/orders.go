package mongo

import (
	procurement "core/pkg"

	"github.com/mongodb/mongo-go-driver/mongo"
)

type OrderRepository struct {
	db     string
	client *mongo.Client
}

func (r *OrderRepository) Find(s string) *procurement.Order {
	return &procurement.Order{}
}
func (r *OrderRepository) FindAll() {}
func (r *OrderRepository) Create()  {}
func (r *OrderRepository) Delete()  {}
func (r *OrderRepository) Update()  {}

func NewOrderRepository(db string, client *mongo.Client) (*OrderRepository, error) {
	r := &OrderRepository{
		db:     db,
		client: client,
	}

	// Build/check index here

	return r, nil
}

// type OrderRepository interface {
// 	Find()
// 	FindAll()
// 	Create()
// 	Delete()
// 	Update()
// }
