const fs = require("fs/promises");

class contenedor {
    constructor(path){
        this.path = path
    }    

    save(producto){
        const productos = fs.readFileSync(`./${this.path}`, 'utf-8')
        const parsedProductos = JSON.parse(productos)
        let idMax = 0
        if(parsedProductos.length == 0){
            Object.assign(producto, {
                id: 1
            })
            parsedProductos.push(producto)
            fs.writeFileSync(`./${this.path}`, JSON.stringify(parsedProductos, null, 2))
            return 1
        }else{
            parsedProductos.forEach(i => {
                if(i.id > idMax){
                    idMax = i.id
                }
            })
            Object.assign(producto, {
                id: idMax + 1
            })
            parsedProductos.push(producto)
            fs.writeFileSync(`./${this.path}`, JSON.stringify(parsedProductos, null, 2))
            return (idMax + 1)
        }

    }

    async getById(idSearch){
        try{
            const resultPromise = await fs.readFile(`./${this.path}`, "utf-8")
            let jsonData = JSON.parse(resultPromise)
            const filter = jsonData.find((db) => db.id == idSearch)
            return await filter
        } catch (error) {
            throw new Error(error);
          }
    }
/*         fs.promises.readFile(`./${this.path}`, 'utf-8')
        .then(contenido  => { await
            let jsonData = JSON.parse(contenido)
            const filter =  jsonData.find((db) => db.id == idSearch)
            return filter
        })
        .catch( err =>{
            console.log('Error de lectura', err)
        })
    } */

    async getAll(){
        try {
          const resultPromise = await fs.readFile(`./${this.path}`, "utf-8")
          const resultObj = JSON.parse(resultPromise)
          return await resultObj
          console.log(resultObj)
        } catch (error) {
          throw new Error(error);
        }
      }
        
    deleteById(idToBeRemoved){
        fs.promises.readFile(`./${this.path}`, 'utf-8')
        .then(data =>{
            let jsonData = JSON.parse(data)
            const objToBeRemoved =  jsonData.find((db) => db.id == idToBeRemoved)
            jsonData.splice(jsonData.findIndex(a => a.id === objToBeRemoved.id) , 1)
            const jsonDataString = JSON.stringify(jsonData)
            try{
                fs.promises.writeFile(`./${this.path}`, jsonDataString)
            }
            catch (err){
                console.log('Error al momento de escribir el archivo')
            }
            })
        .catch(err => {
            console.log('Error de lectura', err)
        })
    }

    deleteAll(){
        try{
            fs.promises.writeFile(`./${this.path}`, "")
        }
        catch (err){
            console.log('Error al momento de escribir el archivo')
        }
    }
    
    


}

module.exports = contenedor

const fileName = "productos.txt"
let Prod = new contenedor(fileName)
Prod.getAll()


