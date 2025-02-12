import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Modal, Button, Form } from "react-bootstrap";
import { api } from "../../api/api";
import { useState, useEffect } from "react";

function EditUser({
  form,
  id,
  setShowForm,
  setForm,
  reload,
  setReload,
  showForm,
}) {
  const navigate = useNavigate();

  const [img, setImg] = useState("");
  const [preview, setPreview] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      delete form._id;

      await api.put("/users/edit", form);

      setShowForm(false);
      setReload(!reload);
    } catch (error) {
      console.log(error);
    }
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleDelete() {
    try {
      await api.delete(
        `https://ironrest.herokuapp.com/jungle-wd-85-profile/${id}`
      );

      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }

  function handleImage(e) {
    setImg(e.target.files[0]);
  }

  return (
    <Modal show={showForm} onHide={() => setShowForm(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Edite seu Perfil</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Label>
            <strong>Imagem do Perfil</strong>
          </Form.Label>
          <Form.Control
            type="file"
            name="profileImage"
            value={form.profileImage}
            onChange={handleChange}
            style={{
              marginBottom: "20px",
            }}
          />
          {/* <label htmlFor="formImg">Foto de perfil:</label>
          <input
            id="formImg"
            name="profileImage"
            type="file"
            onChange={handleImage}
          /> */}
          {img && <img src={preview} alt="" />}
          <Form.Label>
            <strong>Nome</strong>
          </Form.Label>
          <Form.Control
            name="username"
            value={form.username}
            onChange={handleChange}
            style={{
              marginBottom: "20px",
            }}
          />
          <Form.Label>
            <strong>Idade</strong>
          </Form.Label>
          <Form.Control
            name="age"
            value={form.age}
            onChange={handleChange}
            style={{ marginBottom: "20px" }}
          />
          <Form.Label>
            <strong>País</strong>
          </Form.Label>
          <Form.Control
            name="country"
            value={form.country}
            onChange={handleChange}
            style={{ marginBottom: "20px" }}
          />
          <Form.Label>
            <strong>Cidade</strong>
          </Form.Label>
          <Form.Control
            name="city"
            value={form.city}
            onChange={handleChange}
            style={{ marginBottom: "20px" }}
          />

          <Form.Label>
            <strong>Residência</strong>
          </Form.Label>
          <Form.Select
            style={{ marginBottom: "20px" }}
            required
            name="residence"
            onChange={handleChange}
            defaultValue={form.residence}
          >
            <option value=""></option>
            <option value="Apartamento">Apartamento</option>
            <option value="Casa">Casa</option>
            <option value="Sítio">Sítio</option>
            <option value="Studio">Studio</option>
            <option value="Escritório">Escritório</option>
            <option value="Outro">Outro</option>
          </Form.Select>
        </Form>
      </Modal.Body>
      <Modal.Footer className="justify-content-between">
        <Button
          variant="danger"
          className="text-light fw-semibold"
          onClick={handleDelete}
          size="sm"
          style={{ marginTop: "30px" }}
        >
          Delete esse perfil
        </Button>
        <Button
          variant="success"
          onClick={handleSubmit}
          className="text-light fw-semibold"
          size="sm"
          style={{ marginTop: "30px" }}
        >
          {" "}
          Salvar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default EditUser;
