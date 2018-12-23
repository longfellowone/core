package grpc

import "core/pkg/field"

type Server struct {
	Ordering field.Service
}

func New(os field.Service) *Server {
	s := &Server{
		Ordering: os,
	}

	return s
}
