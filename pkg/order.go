package procurement

import (
	"errors"
)

type Order struct {
	Project string
	Date    string
	Status  OrderStatus
}

func NewOrder() *Order {
	return &Order{
		Project: "",
		Date:    "",
		Status:  Complete,
	}
}

var ErrMyError = errors.New("message")

type OrderStatus int

const (
	Complete OrderStatus = iota
	BackOrdered
)

func (s OrderStatus) String() string {
	switch s {
	case Complete:
		return "Complete"
	case BackOrdered:
		return "Back Ordered"
	}
	return ""
}
