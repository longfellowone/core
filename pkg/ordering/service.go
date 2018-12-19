package ordering

// type Service interface {
// 	CreateNewOrder() string
// }

import (
	"core/pkg"
	"log"
)

type orderRepository interface {
	Find(id procurement.OrderID) (*procurement.Order, error)
	// FindAll()
	// // Create()
	// // Delete()
	// Update()
}

type Service struct {
	orders orderRepository
}

func (s *Service) FindOrderByID(id procurement.OrderID) (*procurement.Order, error) {
	order, err := s.orders.Find(id)
	if err != nil {
		log.Fatal(err)
	}

	return &procurement.Order{
		OrderID: order.OrderID,
		Project: order.Project,
		Date:    order.Date,
		Status:  order.Status,
	}, nil
}

func (s *Service) CreateNewOrder(p procurement.Project) (*procurement.Order, error) {
	return &procurement.Order{
		OrderID: "2",
		Project: p,
		Date:    "DEC 19",
		Status:  procurement.BackOrdered,
	}, nil
}

func NewService(orders orderRepository) *Service {
	return &Service{
		orders: orders,
	}
}

//

// type cargoRepository interface {
// 	Store(cargo *Cargo) error
// 	Find(id TrackingID) (*Cargo, error)
// 	FindAll() []*Cargo
// }

// type Service struct {
// 	cargos         cargoRepository
// 	handlingEvents shipping.HandlingEventRepository
// }

// func (s *Service) Track(id string) (Cargo, error) {
// //...
// }

// func NewService(cargos cargoRepository, events shipping.HandlingEventRepository) *Service {
// 	return &Service{
// 		cargos:         cargos,
// 		handlingEvents: events,
// 	}
// }
