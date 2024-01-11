// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract Flourine {

    uint _ID = 0;
    address payable _owner;

    constructor() {
        _owner = payable (msg.sender);
    }

    struct Product {
        uint Id;
        string Name;
        string Description;
        address payable Brand;
        uint Price;
        uint Likes;
        string Category;
        uint Stock;
    }

    mapping (address=>Product[]) public Products;

    modifier productExists(uint _id) {
        require(Products[_owner][_id].Id == _id,"Product not listed!");
        _;
    }

    modifier notOwner(uint _id) {
         require(msg.sender != Products[_owner][_id].Brand,"Owner cannot like or buy!");
        _;
    }

    modifier onlyOwner(uint _id) {
        require(msg.sender == Products[_owner][_id].Brand,"Others cannot change stock number!");
        _;
    }

    modifier inStock(uint _id,uint _quantity) {
        require(Products[_owner][_id].Stock >= _quantity,"Out of Stock");
        _;
    }

    function Test() view public returns(address) {
        return _owner;
    }

    function listProduct(string memory _Name,string memory _Description,address payable _Brand,uint _Price,string memory _Category,uint _Stock) public {

        Product memory newProduct = Product({
            Id : _ID,
            Name : _Name,
            Description : _Description,
            Brand : _Brand,
            Price : _Price,
            Likes : 0,
            Category : _Category,
            Stock : _Stock
        });

        Products[_owner].push(newProduct);
        _ID++;
    }

    function getProducts() public view returns(Product[] memory)  {
        return Products[_owner];
    }

    function getProduct(uint _id) public view productExists(_id) returns(Product memory) {
        return Products[_owner][_id];
    }
    
    function updateStocks(uint _id,uint _stocks) onlyOwner(_id) public productExists(_id) {

        Products[_owner][_id].Stock += _stocks;

    }

    function Likes(uint _id) public notOwner(_id) productExists(_id) {

        Products[_owner][_id].Likes ++;

    }

    function Unlikes(uint _id) public notOwner(_id) productExists(_id) {

        require(Products[_owner][_id].Likes>=0,"Likes cannot reach negative!");
        if(Products[_owner][_id].Likes<=0) revert();
        else Products[_owner][_id].Likes--;

    }

    function purchaseProduct(uint _id,uint _quantity) public payable notOwner(_id) inStock(_id,_quantity) returns (uint ) {

        uint cost = Products[_owner][_id].Price * _quantity;
        uint commission = (cost * 10)/100;
        require(msg.value >= cost,"Not enough balance in wallet!");
        address payable Creditor = Products[_owner][_id].Brand;
        Creditor.transfer(cost-commission);
        _owner.transfer(commission);
        Products[_owner][_id].Stock -= _quantity;
        return cost;

    }

    function filterByName(string memory _Name) public view returns(Product memory) {

        Product memory result;
        uint length = Products[_owner].length;
        for(uint i=0;i<length;i++)
            {
                if (keccak256(abi.encode(Products[_owner][i].Name))==keccak256(abi.encode(_Name))) {
                     result =  Products[_owner][i];
                }
            }
        return result;
    } 

    function filterByCategory(string memory _Category) public view returns(Product memory) {

        Product memory result;
        uint length = Products[_owner].length;
        for(uint i=0;i<length;i++)
            {
                if (keccak256(abi.encode(Products[_owner][i].Category))==keccak256(abi.encode(_Category))) {
                     result =  Products[_owner][i];
                }
            }
        return result;
    } 

}