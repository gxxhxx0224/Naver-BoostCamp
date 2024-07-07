//
//  main.swift
//  BoostCampMission5
//
//  Created by Byeongjo Koo on 6/28/24.
//

import Foundation

// MARK: - Enum

enum GraphvizComponent {
    case digraph
    case subgraph
    case label(String)
    case openBrace
    case closeBrace
    case arrow
    case semiColon
    case whiteSpace
    case linebreak
    case tab
    case dot
    case custom(String)
    
    var value: String {
        switch self {
        case .digraph:
            return "digraph G"
        case .subgraph:
            return "subgraph cluster_\(UniqueNumberGenerator.number)"
        case .label(let value):
            return "label = \"\(value)\""
        case .openBrace:
            return "{"
        case .closeBrace:
            return "}"
        case .arrow:
            return "->"
        case .semiColon:
            return ";"
        case .whiteSpace:
            return " "
        case .linebreak:
            return "\n"
        case .tab:
            return "\t"
        case .dot:
            return "."
        case .custom(let value):
            return value
        }
    }
}

// MARK: - Interface

protocol Graphvizable {
    init(_ packages: PackageProtocol...)
    
    func draw() -> String
}

protocol GraphvizDrawable {
    var components: [GraphvizComponent] { get }
}

protocol PackageProtocol: GraphvizDrawable {
    var files: [FileProtocol] { get }
    
    init(name: String, _ file: FileProtocol...)
    
    static var `extension`: String { get }
}

protocol FileProtocol: GraphvizDrawable {
    var types: [CustomTypeProtocol] { get }
    
    init(name: String, type: CustomTypeProtocol...)
    
    static var `extension`: String { get }
}

protocol CustomTypeProtocol: GraphvizDrawable {
    var name: String { get }
    var properties: [PropertyProtocol] { get }
    
    init(name: String, _ property: PropertyProtocol...)
}

protocol PropertyProtocol: GraphvizDrawable {
    var name: String { get }
    var type: String { get }
    
    init(name: String, type: String)
}

// MARK: - Implemetation

struct Graphviz: Graphvizable {
    private let packages: [PackageProtocol]
    
    init(_ package: PackageProtocol...) {
        packages = package
    }
    
    func draw() -> String {
        let extendedPackages = packages + [Graphviz.systemPackage]
        var components = [GraphvizComponent]()
        components += [.digraph, .whiteSpace, .openBrace, .linebreak]
        for package in extendedPackages {
            components += [.whiteSpace, .whiteSpace, .whiteSpace]
            components += package.components
            components += [.linebreak]
        }
        for package in packages {
            for file in package.files {
                for type in file.types {
                    for property in type.properties {
                        components += [.tab, .custom(property.name), .whiteSpace, .arrow, .whiteSpace,]
                        components += [.custom(property.type), .semiColon, .linebreak]
                    }
                }
            }
        }
        components += [.closeBrace]
        return components.reduce("", { $0 + $1.value })
    }
    
    private static let systemPackage =  Package(
        name: "System",
        File(
            name: "Source",
            type: CustomType(name: "String"), CustomType(name: "Int")
        )
    )
}

// MARK: - Package

extension PackageProtocol {
    static var `extension`: String { " Package" }
}

struct Package: PackageProtocol {
    let files: [FileProtocol]
    
    private let name: String
    
    init(name: String, _ file: FileProtocol...) {
        self.name = name
        files = file
    }
    
    var components: [GraphvizComponent] {
        var components = [GraphvizComponent]()
        components += [.subgraph, .whiteSpace, .openBrace, .linebreak]
        components += [.tab, .label(name + Package.extension), .semiColon, .linebreak]
        for file in files {
            components += [.tab, .tab]
            components += file.components
        }
        components += [.tab, .closeBrace, .linebreak]
        return components
    }
}

// MARK: - File

extension FileProtocol {
    static var `extension`: String { ".file" }
}

struct File: FileProtocol {
    let types: [CustomTypeProtocol]
    
    private let name: String
    
    init(name: String, type: CustomTypeProtocol...) {
        self.name = name
        types = type
    }
    
    var components: [GraphvizComponent] {
        var components = [GraphvizComponent]()
        components += [.subgraph, .whiteSpace, .openBrace, .linebreak]
        for type in types {
            components += [.tab, .tab, .tab, .custom(type.name), .linebreak]
            components += type.components
        }
        components += [.tab, .tab, .tab, .label(name + File.extension), .semiColon, .linebreak]
        components += [.tab, .tab, .closeBrace, .linebreak]
        return components
    }
}

// MARK: - Type

struct CustomType: CustomTypeProtocol {
    let name: String
    let properties: [PropertyProtocol]
    
    init(name: String, _ property: any PropertyProtocol...) {
        self.name = name
        properties = property
    }
    
    var components: [GraphvizComponent] {
        var components = [GraphvizComponent]()
        for property in properties {
            components += [.tab, .tab, .tab]
            components += property.components
        }
        return components
    }
}

// MARK: - Property

struct Property: PropertyProtocol {
    let name: String
    let type: String
    
    init(name: String, type: String) {
        self.name = name
        self.type = type
    }
    
    var components: [GraphvizComponent] {
        [.custom(name), .semiColon, .linebreak]
    }
}

// MARK: - Number generator

enum UniqueNumberGenerator {
    private static var counter = 0
    
    static var number: Int {
        defer { counter += 1 }
        return counter
    }
}

// MARK: - Tests

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
        )
    )
    print(graphviz.draw())
}
test()
