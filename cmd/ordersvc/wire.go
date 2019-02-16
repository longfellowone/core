// +build wireinject

package main

import (
	"core/pkg/field"
	"core/pkg/postgres"
	"github.com/google/wire"
)

func InitializeFieldService(postgresConnectionString string) *field.Service {
	wire.Build(
		postgres.Set,
		field.Set,
	)
	return nil
}
