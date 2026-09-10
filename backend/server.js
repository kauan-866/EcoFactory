const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());


// ==========================================
// CONEXÃO COM O POSTGRESQL
// ==========================================

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

pool.query("SELECT NOW()", (erro, resultado) => {
    if (erro) {
        console.error("❌ Erro ao conectar com PostgreSQL:", erro.message);
    } else {
        console.log("✅ PostgreSQL conectado!");
        console.log("Hora do banco:", resultado.rows[0].now);
    }
});


// ==========================================
// ROTA PRINCIPAL
// ==========================================

app.get("/", (req, res) => {
    res.json({
        mensagem: "Backend do EcoFactory funcionando!"
    });
});


// ==========================================
//        MÁQUINAS
// ==========================================


// LISTAR TODAS AS MÁQUINAS
app.get("/maquinas", async (req, res) => {
    try {
        const resultado = await pool.query(`
            SELECT
                id,
                nome,
                modelo,
                setor,
                status,
                descricao
            FROM maquinas
            ORDER BY id
        `);

        res.json(resultado.rows);

    } catch (erro) {
        console.error("❌ Erro ao buscar máquinas:", erro.message);

        res.status(500).json({
            erro: "Erro ao buscar máquinas",
            detalhe: erro.message
        });
    }
});


// BUSCAR UMA MÁQUINA
app.get("/maquinas/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const resultado = await pool.query(
            `
            SELECT
                id,
                nome,
                modelo,
                setor,
                status,
                descricao
            FROM maquinas
            WHERE id = $1
            `,
            [id]
        );

        if (resultado.rows.length === 0) {
            return res.status(404).json({
                erro: "Máquina não encontrada"
            });
        }

        res.json(resultado.rows[0]);

    } catch (erro) {
        console.error("❌ Erro ao buscar máquina:", erro.message);

        res.status(500).json({
            erro: "Erro ao buscar máquina",
            detalhe: erro.message
        });
    }
});


// CADASTRAR MÁQUINA
app.post("/maquinas", async (req, res) => {
    try {
        const {
            nome,
            modelo,
            setor,
            status,
            descricao
        } = req.body;

        if (!nome || nome.trim() === "") {
            return res.status(400).json({
                erro: "O nome da máquina é obrigatório"
            });
        }

        const resultado = await pool.query(
            `
            INSERT INTO maquinas
            (nome, modelo, setor, status, descricao)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *
            `,
            [
                nome.trim(),
                modelo ? modelo.trim() : null,
                setor ? setor.trim() : null,
                status || "Ativo",
                descricao ? descricao.trim() : null
            ]
        );

        res.status(201).json(resultado.rows[0]);

    } catch (erro) {
        console.error("❌ Erro ao cadastrar máquina:", erro.message);

        res.status(500).json({
            erro: "Erro ao cadastrar máquina",
            detalhe: erro.message
        });
    }
});


// EDITAR MÁQUINA
app.put("/maquinas/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const {
            nome,
            modelo,
            setor,
            status,
            descricao
        } = req.body;

        if (!nome || nome.trim() === "") {
            return res.status(400).json({
                erro: "O nome da máquina é obrigatório"
            });
        }

        const resultado = await pool.query(
            `
            UPDATE maquinas
            SET
                nome = $1,
                modelo = $2,
                setor = $3,
                status = $4,
                descricao = $5
            WHERE id = $6
            RETURNING *
            `,
            [
                nome.trim(),
                modelo ? modelo.trim() : null,
                setor ? setor.trim() : null,
                status || "Ativo",
                descricao ? descricao.trim() : null,
                id
            ]
        );

        if (resultado.rows.length === 0) {
            return res.status(404).json({
                erro: "Máquina não encontrada"
            });
        }

        res.json(resultado.rows[0]);

    } catch (erro) {
        console.error("❌ Erro ao editar máquina:", erro.message);

        res.status(500).json({
            erro: "Erro ao editar máquina",
            detalhe: erro.message
        });
    }
});


// EXCLUIR MÁQUINA
app.delete("/maquinas/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const resultado = await pool.query(
            `
            DELETE FROM maquinas
            WHERE id = $1
            RETURNING *
            `,
            [id]
        );

        if (resultado.rows.length === 0) {
            return res.status(404).json({
                erro: "Máquina não encontrada"
            });
        }

        res.json({
            mensagem: "Máquina excluída com sucesso",
            maquina: resultado.rows[0]
        });

    } catch (erro) {
        console.error("❌ Erro ao excluir máquina:", erro.message);

        // Máquina possui produções, consumo ou ocorrências relacionadas
        if (erro.code === "23503") {
            return res.status(409).json({
                erro: "Não é possível excluir esta máquina porque existem registros relacionados a ela."
            });
        }

        res.status(500).json({
            erro: "Erro ao excluir máquina",
            detalhe: erro.message
        });
    }
});


// ==========================================
//        PRODUÇÕES
// ==========================================


// LISTAR TODAS AS PRODUÇÕES
app.get("/producoes", async (req, res) => {
    try {

        const resultado = await pool.query(`
            SELECT
                p.id,
                p.maquina_id,
                m.nome AS maquina,
                p.produto,
                p.quantidade,
                p.data_producao,
                p.turno
            FROM producoes p
            INNER JOIN maquinas m
                ON p.maquina_id = m.id
            ORDER BY p.data_producao DESC, p.id DESC
        `);

        res.json(resultado.rows);

    } catch (erro) {

        console.error("❌ Erro ao buscar produções:", erro);
        console.error("Mensagem:", erro.message);
        console.error("Código:", erro.code);

        res.status(500).json({
            erro: "Erro ao buscar produções",
            detalhe: erro.message
        });
    }
});


// BUSCAR UMA PRODUÇÃO
app.get("/producoes/:id", async (req, res) => {
    try {

        const { id } = req.params;

        const resultado = await pool.query(
            `
            SELECT
                p.id,
                p.maquina_id,
                m.nome AS maquina,
                p.produto,
                p.quantidade,
                p.data_producao,
                p.turno
            FROM producoes p
            INNER JOIN maquinas m
                ON p.maquina_id = m.id
            WHERE p.id = $1
            `,
            [id]
        );

        if (resultado.rows.length === 0) {
            return res.status(404).json({
                erro: "Produção não encontrada"
            });
        }

        res.json(resultado.rows[0]);

    } catch (erro) {

        console.error("❌ Erro ao buscar produção:", erro.message);

        res.status(500).json({
            erro: "Erro ao buscar produção",
            detalhe: erro.message
        });
    }
});


// CADASTRAR PRODUÇÃO
app.post("/producoes", async (req, res) => {
    try {

        const {
            maquina_id,
            produto,
            quantidade,
            data_producao,
            turno
        } = req.body;


        // Verificar máquina
        if (!maquina_id) {
            return res.status(400).json({
                erro: "A máquina é obrigatória"
            });
        }


        // Verificar produto
        if (!produto || produto.trim() === "") {
            return res.status(400).json({
                erro: "O produto é obrigatório"
            });
        }


        // Verificar quantidade
        if (
            quantidade === undefined ||
            quantidade === null ||
            quantidade === "" ||
            Number(quantidade) <= 0
        ) {
            return res.status(400).json({
                erro: "A quantidade deve ser maior que zero"
            });
        }


        // Verificar data
        if (!data_producao) {
            return res.status(400).json({
                erro: "A data de produção é obrigatória"
            });
        }


        // Verificar se a máquina existe
        const maquina = await pool.query(
            `
            SELECT id
            FROM maquinas
            WHERE id = $1
            `,
            [maquina_id]
        );

        if (maquina.rows.length === 0) {
            return res.status(404).json({
                erro: "A máquina selecionada não existe"
            });
        }


        // Inserir produção
        const resultado = await pool.query(
            `
            INSERT INTO producoes
            (
                maquina_id,
                produto,
                quantidade,
                data_producao,
                turno
            )
            VALUES
            ($1, $2, $3, $4, $5)
            RETURNING *
            `,
            [
                maquina_id,
                produto.trim(),
                Number(quantidade),
                data_producao,
                turno || null
            ]
        );


        res.status(201).json(resultado.rows[0]);

    } catch (erro) {

        console.error("❌ Erro ao cadastrar produção:", erro);
        console.error("Mensagem:", erro.message);
        console.error("Código:", erro.code);

        res.status(500).json({
            erro: "Erro ao cadastrar produção",
            detalhe: erro.message
        });
    }
});


// EDITAR PRODUÇÃO
app.put("/producoes/:id", async (req, res) => {
    try {

        const { id } = req.params;

        const {
            maquina_id,
            produto,
            quantidade,
            data_producao,
            turno
        } = req.body;


        if (!maquina_id) {
            return res.status(400).json({
                erro: "A máquina é obrigatória"
            });
        }


        if (!produto || produto.trim() === "") {
            return res.status(400).json({
                erro: "O produto é obrigatório"
            });
        }


        if (
            quantidade === undefined ||
            quantidade === null ||
            quantidade === "" ||
            Number(quantidade) <= 0
        ) {
            return res.status(400).json({
                erro: "A quantidade deve ser maior que zero"
            });
        }


        if (!data_producao) {
            return res.status(400).json({
                erro: "A data de produção é obrigatória"
            });
        }


        const resultado = await pool.query(
            `
            UPDATE producoes
            SET
                maquina_id = $1,
                produto = $2,
                quantidade = $3,
                data_producao = $4,
                turno = $5
            WHERE id = $6
            RETURNING *
            `,
            [
                maquina_id,
                produto.trim(),
                Number(quantidade),
                data_producao,
                turno || null,
                id
            ]
        );


        if (resultado.rows.length === 0) {
            return res.status(404).json({
                erro: "Produção não encontrada"
            });
        }


        res.json(resultado.rows[0]);

    } catch (erro) {

        console.error("❌ Erro ao editar produção:", erro.message);

        res.status(500).json({
            erro: "Erro ao editar produção",
            detalhe: erro.message
        });
    }
});


// EXCLUIR PRODUÇÃO
app.delete("/producoes/:id", async (req, res) => {
    try {

        const { id } = req.params;

        const resultado = await pool.query(
            `
            DELETE FROM producoes
            WHERE id = $1
            RETURNING *
            `,
            [id]
        );


        if (resultado.rows.length === 0) {
            return res.status(404).json({
                erro: "Produção não encontrada"
            });
        }


        res.json({
            mensagem: "Produção excluída com sucesso",
            producao: resultado.rows[0]
        });

    } catch (erro) {

        console.error("❌ Erro ao excluir produção:", erro.message);

        res.status(500).json({
            erro: "Erro ao excluir produção",
            detalhe: erro.message
        });
    }
});


// ==========================================
//        CONSUMO
// ==========================================


// LISTAR CONSUMO
app.get("/consumo", async (req, res) => {
    try {

        const resultado = await pool.query(`
            SELECT
                c.id,
                c.maquina_id,
                m.nome AS maquina,
                c.energia,
                c.agua,
                c.data_consumo
            FROM consumo c
            INNER JOIN maquinas m
                ON c.maquina_id = m.id
            ORDER BY c.data_consumo DESC, c.id DESC
        `);

        res.json(resultado.rows);

    } catch (erro) {

        console.error("❌ Erro ao buscar consumo:", erro.message);

        res.status(500).json({
            erro: "Erro ao buscar consumo",
            detalhe: erro.message
        });
    }
});


// ==========================================
//        OCORRÊNCIAS
// ==========================================


// LISTAR OCORRÊNCIAS
app.get("/ocorrencias", async (req, res) => {
    try {

        const resultado = await pool.query(`
            SELECT
                o.id,
                o.maquina_id,
                m.nome AS maquina,
                o.descricao,
                o.gravidade,
                o.data_ocorrencia
            FROM ocorrencias o
            INNER JOIN maquinas m
                ON o.maquina_id = m.id
            ORDER BY o.data_ocorrencia DESC, o.id DESC
        `);

        res.json(resultado.rows);

    } catch (erro) {

        console.error("❌ Erro ao buscar ocorrências:", erro.message);

        res.status(500).json({
            erro: "Erro ao buscar ocorrências",
            detalhe: erro.message
        });
    }
});


// ==========================================
//        INICIAR SERVIDOR
// ==========================================

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});