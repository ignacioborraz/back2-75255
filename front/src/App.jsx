import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios("http://localhost:8000/api/products")
      //.then((res) => console.log(res.data.response))
      .then((res) => setProducts(res.data.response))
      .catch((err) => console.log(err));
  }, []);

  return (
    <section className="flex flex-wrap justify-evenly bg-gray-300">
      {products.map((each) => (
        <article className="m-2 p-2 bg-white rounded" key={each._id}>
          <h3>{each.title}</h3>
          <img src={each.image} alt={each.title} className="w-[360px]" />
        </article>
      ))}
    </section>
  );
}

export default App;
