package search

import (
	"core/pkg"
	"fmt"
)

type Service interface {
	Test()
	//ProductsByString(string procurement.ProductID) (*procurement.Product, error)
	//Test() *[]procurement.Product
}

//type productRepository interface {
//	FindAll() ([]procurement.Product, error)
//	FindAllTest(string procurement.ProductID) (*procurement.Product, error)
//}

type service struct {
	products     procurement.ProductRepository
	productsList *[]procurement.Product
}

func (s *service) Test() {
	fmt.Println("test")
}

//func (s *service) ProductsByString(string procurement.ProductID) (*procurement.Product, error) {
//	result, err := s.products.FindAllTest(string)
//	if err != nil {
//		return &procurement.Product{}, err
//	}
//
//	return &procurement.Product{Name: result.Name}, nil
//}

//func (s *service) Test() *[]procurement.Product {
//	return s.productsList
//}

func NewService(products procurement.ProductRepository) Service {
	//productsList, _ := products.FindAll()
	//test, _ := products.FindAll()
	//fmt.Printf("%T text\n", test)

	// cache all products for search
	// https://github.com/coocood/freecache
	// https://github.com/go-redis/redis
	// https://github.com/golang/groupcache
	// https://goenning.net/2017/03/18/server-side-cache-go/

	return &service{
		products: products,
		//productsList: productsList,
	}
}
