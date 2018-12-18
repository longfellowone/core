package ordering

// type Service interface {
// 	CreateNewOrder() string
// }

import (
	procurement "core/pkg"
)

type orderRepository interface {
	Find(string) *procurement.Order
	// FindAll()
	// // Create()
	// // Delete()
	// Update()
}

type Service struct {
	orders orderRepository
}

func (s *Service) CreateNewOrder() string {

	return "string"
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
