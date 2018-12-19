package mongo

import (
	"core/pkg"
	"errors"
	"github.com/mongodb/mongo-go-driver/mongo"
)

type OrderRepository struct {
	db     string
	client *mongo.Client
}

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
