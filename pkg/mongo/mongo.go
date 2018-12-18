package mongo

import (
	"core/pkg"
	"github.com/mongodb/mongo-go-driver/mongo"
)

type orderRepository struct {
	db     string
	client *mongo.Client
}

func (r *orderRepository) Find()    {}
func (r *orderRepository) FindAll() {}
func (r *orderRepository) Create()  {}
func (r *orderRepository) Delete()  {}
func (r *orderRepository) Update()  {}

func NewOrderRepository(db string, client *mongo.Client) (procurement.OrderRepository, error) {
	r := &orderRepository{
		db:     db,
		client: client,
	}
	return r, nil
}
