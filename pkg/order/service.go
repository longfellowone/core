package ordering

import "core/pkg"

type Service interface {
	CreateNewOrder() string
}

type service struct {
	orders procurement.OrderRepository
}

func (s *service) CreateNewOrder() string {
	return "my string"
}

func NewService(orders procurement.OrderRepository) Service {
	return &service{
		orders: orders,
	}
}
