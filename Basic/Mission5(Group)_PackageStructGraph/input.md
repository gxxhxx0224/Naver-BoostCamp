## Input
func test() {
    let graphviz = Graphviz(
        Package(
            name: "Service",
            File(
                name: "Product",
                type: CustomType(
                    name: "Product",
                    Property(name: "sku", type: "String"),
                    Property(name: "price", type: "Int"),
                    Property(name: "title", type: "String")
                )
            ),
            File(
                name: "Order",
                type: CustomType(
                    name: "Order",
                    Property(name: "orderID", type: "String"),
                    Property(name: "product", type: "Product")
                )
            )
        ),
        Package(
            name: "BoostCamp",
            File(
                name: "Mentor",
                type: CustomType(
                    name: "Mentor",
                    Property(name: "name", type: "String"),
                    Property(name: "skill", type: "String"),
                    Property(name: "rating", type: "Int"),
                    Property(name: "goods", type: "Product")
                )
            )
        )
    )
    print(graphviz.draw())
}
