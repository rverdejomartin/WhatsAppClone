const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());

const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173',
        methods: ['*']
    }
});

//variable para guardar los usuarios
let usuarios = [];

function emitirUsuarios() {
    io.emit('usuarios_online', usuarios);
} Ç//lista actualizada para que aparezca en general a todo el mundo

io.on('connection', (socket) => {
    //registro de nombre
    socket.on('registro', (datos) => {
        socket.data.nombre = datos.nombre;
        socket.data.avatar = datos.avatar;
        socket.data.estado = datos.estado;

        //añadimos usuario al array 
        usuarios.push({
            socketId: socket.id,
            nombre: datos.nombre,
            avatar: datos.avatar,
            estado: datos.estado
        });

        //aviso general de que alguien entró al chat + aviso propio
        socket.emit('nuevo_mensaje', {
            tipo: 'sistema',
            texto: 'Te has unido al chat'
        });
        socket.broadcast.emit('nuevo_mensaje', {
            tipo: 'sistema',
            texto: datos.nombre + ' se ha unido al chat'
        });
    });

    //un usuario escribe un mensaje:
    socket.on('mensaje', (datos) => {
        socket.broadcast.emit('nuevo_mensaje', {
            tipo: 'mensaje',
            socketId: socket.id,
            nombre: datos.nombre,
            avatar: datos.avatar,
            texto: datos.texto
        })
    });

    //cuando alguien escribe, avisamos al resto
    socket.on('escribiendo', (nombre) => {
        socket.broadcast.emit('usuario_escribiendo', nombre);
    });

    //cuando un usuario se desconecta
    socket.on('disconnect', () => {
        if (socket.data.nombre) { //si llega a haber nombre, osea se ha regitrado
            usuariosOnline--;
            io.emit('usuarios_online', usuariosOnline);
            io.emit('nuevo_mensaje', {
                tipo: 'sistema',
                texto: socket.data.nombre + ' ha salido del chat'
            });
        }
    });
});

server.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
});