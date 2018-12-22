package search

import "core/pkg"

// type Service interface {
// 	CreateNewOrder() string
// }

type productRepository interface {
	FindAll() ([]procurement.Product, error)
	FindAllTest(string procurement.ProductID) (*procurement.Product, error)
}

type Service struct {
	products     productRepository
	productsList []procurement.Product
}

func (s *Service) ProductsByString(string procurement.ProductID) (*procurement.Product, error) {
	result, err := s.products.FindAllTest(string)
	if err != nil {
		return &procurement.Product{}, err
	}

	return &procurement.Product{Name: result.Name}, nil
}

func (s *Service) Test() []procurement.Product {
	return s.productsList
}

func NewService(products productRepository) *Service {
	productsList, _ := products.FindAll()
	// cache all products for search
	// https://github.com/coocood/freecache
	// https://github.com/go-redis/redis
	// https://github.com/golang/groupcache
	// https://goenning.net/2017/03/18/server-side-cache-go/

	return &Service{
		products:     products,
		productsList: productsList,
	}
}
