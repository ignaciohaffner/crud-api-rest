let express = require('express');
const mysql = require('mysql');
let cors = require('cors')

let app = express();
app.use(express.json())
app.use(cors())

// establecemos los parametros de conexion
let conexion = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'articulosdb'
  });

// probamos conexion
conexion.connect((error)=> {
    if(error){
        throw error;
    }else {
        console.log('conexion exitosa a la db')
    }
})

app.get('/', (req,res)=> {
    res.send('Ruta INICIO')
})

// mostrar todos los articulos
app.get('/api/articulos', (req, res)=>{
    conexion.query('SELECT * FROM articulos', (error, filas)=> {
        if(error){
            throw error
        } else{
            res.send(filas)
        }
    })
})

// mostrar un SOLO articulo

app.get('/api/articulos/:id', (req, res)=>{
    conexion.query('SELECT * FROM articulos WHERE id = ?',[req.params.id], (error, fila)=> {
        if(error){
            throw error
        } else{
            res.send(fila)
        }
    })
})


// crear un articulo

app.post('/api/articulos', (req,res)=> {
    let data = {descripcion:req.body.descripcion, precio:req.body.precio, stock:req.body.stock}
    let sql = 'INSERT INTO articulos SET ?'
    conexion.query(sql, data, (error, results)=>{
        if(error){
            throw error
        } else{
            res.send(results)
        }
    })
})

// editar un articulo
app.put('/api/articulos/:id',(req,res)=>{
    let id = req.params.id
    let descripcion = req.body.descripcion
    let precio = req.body.precio
    let stock = req.body.stock
    let sql = 'UPDATE articulos SET descripcion = ?, precio = ?, stock = ? WHERE id = ?'
    conexion.query(sql, [descripcion, precio, stock, id], (error, results)=> {
        if(error){
            throw error
        } else{
            res.send(results)
        }
    })
})

// elimitar un articulo
app.delete('/api/articulos/:id', (req,res)=>{
    conexion.query('DELETE FROM articulos WHERE id = ?', [req.params.id], (error, filas)=> {
        if(error){
            throw error
        } else{
            res.send(filas)
        }
    })
})

const puerto = process.env.PUERTO || 3000 ;

app.listen(puerto, ()=> {
    console.log('Servidor prendido maestro en puerto: '+puerto)
})
