package grpc

import "core/pkg/order"

type Server struct {
	Ordering ordering.Service
}

func New(os ordering.Service) *Server {
	s := &Server{
		Ordering: os,
	}

	return s
}
