var express = require('express');
var app = express();

var cors = require('cors');
app.use(cors());
app.use(express.json());

app.listen(5555, function () {
    console.log("Server is running...")
})

const { db } = require('./config/admin')

app.get("/api/get", async (req, res) => {
    const productRef = db.collection('foods');
    try {
        productRef.get().then((snapshot) => {
            const items = snapshot.docs.map((doc) => (
                {
                    id: doc.id,
                    ...doc.data()
                }
            ))
            console.log(items);
            res.status(201).json(items);
        })
    } catch (error) {
        res.status(500).json({ message: error });
    }
})

app.get("/api/get/:id", async (req, res) => {
    const { id } = req.params;
    console.log(id)
    try {
        const productRef = db.collection('foods').doc(id);
        productRef.get().then((snapshot) => {
            const items = snapshot.data()     
            console.log(items);
            res.status(201).json(items);
        })
    } catch (error) {
        return res.status(500).json(error.message);
    }
});


app.post("/api/create", (req, res) => {
    const { title, image, price, description } = req.body;
    try {
        const productRef = db.collection('foods').doc();
        const product = {
            title,
            image,
            price,
            description
        };
        productRef.set(product);
        res.status(200).send({ message: 'Add Successfully' });
    } catch (error) {
        res.status(500).json(error.message);
    }
});

app.put("/api/update/:id", async (req, res) => {
    const ref = db.collection("foods");
    const id = req.params.id;
    console.log(id);
    const data = req.body;
    try {
      ref.doc(id).update(data);
      res.status(201).json({ message: "Food updated successfully" });
    } catch (error) {
      res.status(500).json({ general: "Something went wrong, please try again" });
    }
  });

app.delete("/api/delete/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const productRef = db.collection('foods').doc(id);

        await productRef.delete().catch((error) => {
            return res.status(400).json({
                status: 'error',
                message: error.message,
            });
        });

        return res.status(200).json({
            status: 'success',
            message: 'Deleted Successfully',
        });
    } catch (error) {
        return res.status(500).json(error.message);
    }
});

//search 
app.get("/api/search/:title", async (req, res) => {
    const ref = db.collection("foods");
    const title = req.params.title;
    console.log(title);
    try {
      ref.where("title", "==", title).get().then((snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log(data);
        res.status(201).json(data);
      });
    } catch (error) {
      res.status(500).json({ general: "Something went wrong, please try again" });
    }
  });