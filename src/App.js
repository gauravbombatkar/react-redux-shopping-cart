import React from 'react';
import data from './data.json';
import Products from './components/Products';
import Filter from './components/Filter';

class App extends React.Component {

  constructor() {
    super();
    this.state = {
      product: data.products,
      size: "",
      sort: ""
    }
  }

  sortProducts = (event) => {
    console.log(event.target.value);
    const sort = event.target.value
    this.setState((state) => ({
      sort: sort,
      product: this.state.product
        .slice()
        .sort((a, b) =>
          sort === "lowest" ?
            a.price > b.price ? 1 : -1 :
            sort === "highest" ?
              a.price < b.price ? 1 : -1 :
              a._id < b._id ? 1 : -1
        )
    }));

  };

  filterProducts = (event) => {
    if (event.target.value === "") {
      this.setState({ size: event.target.value, product: data.products });
    } else {
      //console.log(event.target.value);
      this.setState({
        size: event.target.value,
        product: data.products.filter((product) => product.availableSizes.indexOf(event.target.value) >= 0
        ),
      });
    }
  }

  render() {
    return (
      <div className="grid-container">
        <header>
          <a href="/">React Shopping Cart</a>
        </header>
        <main>
          <div className="content">
            <div className="main">
              <Filter count={this.state.product.length}
                size={this.state.size}
                sort={this.state.sort}
                filterProducts={this.filterProducts}
                sortProducts={this.sortProducts}
              ></Filter>
              <Products products={this.state.product}></Products>
            </div>
            <div className="sidebar">Cart Items</div>
          </div>
        </main>
        <footer>
          All Right is reserved.
    </footer>
      </div>
    )
  }
}

export default App;
