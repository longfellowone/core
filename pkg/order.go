package procurement

import (
	"errors"
)

type OrderID string

type Order struct {
	OrderID OrderID
	Project Project
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
