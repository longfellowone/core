package procurement

type ProductID string
type Category string
type Name string
type UOM string

type Product struct {
	ID       ProductID
	Category Category
	Name     Name
	UOM      UOM
}

type ProductRepository interface {
	FindAll() (*[]Product, error)
	FindAllTest(string ProductID) (*Product, error)
}
