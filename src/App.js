import {
  Container,
  TextField,
  Button,
  Grid,
  CardContent,
  CardActions,
  Typography,
  Input,
  Tooltip,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

const App = () => {
  const [data, setData] = useState();
  const [nama, setNama] = useState();
  const [harga, setHarga] = useState();
  const [id, setId] = useState();

  useEffect(() => {
    getProducts();
  }, []);

  const ubahnama = (e) => {
    setNama(e.target.value);
  };
  const ubahharga = (e) => {
    setHarga(e.target.value);
  };

  const submit = (e) => {
    e.preventDefault();
    if (id) {
      updateProducts();
    } else {
      postProducts();
    }
    setHarga("");
    setNama("");
    setId("");
    getProducts();
  };

  //get
  const config = {
    method: "get",
    url: "http://localhost:4000/product",
    headers: {},
  };

  const getProducts = async () => {
    await axios(config)
      .then(function (response) {
        setData(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  //akhir get
  //post
  const postProducts = async () => {
    await axios
      .post(`http://localhost:4000/product`, {
        title: nama,
        price: harga,
      })

      .catch(function (error) {
        console.log(error);
      });
  };
  //akhir post
  //update
  const updateProducts = async () => {
    await axios
      .patch(`http://localhost:4000/product/${id}`, {
        title: nama,
        price: harga,
      })
      .then(function (response) {})
      .catch(function (error) {
        console.log(error);
      });
  };
  //akhir update
  //delete product
  const deleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/product/${id}`);
      getProducts();
    } catch (error) {
      console.log(error);
    }
  };
  //akhir delete product
  return (
    <Container sx={{ color: "text.primary", mt: "10px" }}>
      <Typography
        sx={{ my: "30px" }}
        variant="h3"
        component="h1"
        align="center"
      >
        CRUD
      </Typography>
      <form onSubmit={(e) => submit(e)}>
        <TextField
          label="Nama Produk"
          color="secondary"
          variant="outlined"
          sx={{ mx: "5px" }}
          value={nama}
          focused
          onChange={(e) => ubahnama(e)}
        />
        <TextField
          label="Harga Produk"
          color="secondary"
          variant="outlined"
          type="number"
          sx={{ mx: "5px" }}
          value={harga}
          focused
          onChange={(e) => ubahharga(e)}
        />
        <Tooltip title="belum berfungsi">
          <label htmlFor="contained-button-file">
            <Input
              accept="image/*"
              id="contained-button-file"
              multiple
              type="file"
            />
            <Button
              onClick={(e) => {
                console.log(e);
              }}
              variant="contained"
              component="span"
            >
              Upload
            </Button>
          </label>
        </Tooltip>
        <Button type="submit" size="large" sx={{ mx: "5px" }} variant="text">
          Add
        </Button>
      </form>
      <Grid container spacing={2}>
        {data
          ? data.map((d, i) => (
              <Grid xs={4} key={d._id}>
                <CardContent>
                  <h2>{d.title}</h2>
                  <p>Rp{d.price}</p>
                </CardContent>
                <CardActions>
                  <Button
                    onClick={() => {
                      setNama(d.title);
                      setHarga(d.price);
                      setId(d._id);
                    }}
                    size="small"
                  >
                    edit
                  </Button>
                  <Button onClick={() => deleteProduct(d._id)} size="small">
                    hapus
                  </Button>
                </CardActions>
              </Grid>
            ))
          : ""}
      </Grid>
    </Container>
  );
};

export default App;
