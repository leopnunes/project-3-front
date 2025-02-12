import { useEffect, useState } from "react";

import { api } from "../../api/api";
import { Link, useNavigate } from "react-router-dom";
import EditUser from "../../components/EditUser";
import Card from "react-bootstrap/Card";

import profileImage from "../../assets/05 - Imagem.png";
import Quiz from "../Quiz";

import { Button, Accordion } from "react-bootstrap";

function Profile() {
  //const decoratedOnClick = useAccordionButton(eventKey, onClick);

  const [user, setUser] = useState({ username: "", email: "" });
  const [isLoading, setIsLoading] = useState(true);

  const [img, setImg] = useState("");
  const [reload, setReload] = useState(true);

  const [showForm, setShowForm] = useState(false);

  const navigate = useNavigate();

  const [formGarden, setFormGarden] = useState({
    name: "",
    local: "",
  });

  function handleChange(e) {
    setFormGarden({ ...formGarden, [e.target.name]: e.target.value });
  }

  console.log(formGarden);

  //states das perguntas
  const [luminosidade, setLuminosidade] = useState(0);
  const [cuidado, setCuidado] = useState(0);

  const [form, setForm] = useState({
    profileImage: "",
    username: "",
    age: "",
    country: "",
    city: "",
    residence: "",
    garden: [],
  });

  useEffect(() => {
    async function fetchUser() {
      setIsLoading(true);
      try {
        const response = await api.get("/users/profile");
        setUser(response.data);

        setForm(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    fetchUser();
  }, [reload]);

  /*   function handleAccordion() {
    console.log("dentro da funcao");
    setReload(!reload);
  } */
  console.log(user);

  function handleLogOut(e) {
    e.preventDefault();
    localStorage.removeItem("loggedInUser");
    navigate("/");
  }
  console.log(user);

  async function handleSubmitGarden(e) {
    e.preventDefault();
    try {
      const response = await api.post(`/garden/create`, formGarden);

      setReload(!reload);
      setFormGarden({
        name: "",
        local: "",
      });
    } catch (error) {
      console.log(error);
    }
  }

  console.log(user);
  console.log(isLoading);

  return (
    <div style={{ backgroundColor: "#EDDDD6" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <h1 className="AllSub">Meu Perfil</h1>

        <img src={profileImage} alt="plantinha" className="profileImg" />
      </div>

      <div className="barraSup">
        <span className="username">{user.username}</span>
        <span>
          <strong>Ambiente:</strong> {user.residence} |
        </span>
        <span style={{ marginRight: "12px" }}>{user.age} anos</span>

        <Button
          onClick={() => setShowForm(!showForm)}
          className="btn btn-light btn-outline-dark btn-sm me-2"
          style={{
            backgroundColor: "#7C6053",
            color: "white",
            borderColor: "#7C6053",
            margin: "10px",
            marginTop: "16px",
          }}
        >
          Editar Perfil
        </Button>
        <button
          onClick={handleLogOut}
          className="btn btn-light btn-outline-dark btn-sm me-2"
          style={{
            backgroundColor: "#7C6053",
            color: "white",
            borderColor: "#7C6053",
            margin: "10px",
            marginTop: "16px",
          }}
        >
          Sair
        </button>
      </div>

      {showForm === true && (
        <EditUser
          form={form}
          id={user._id}
          setShowForm={setShowForm}
          setForm={setForm}
          reload={reload}
          setReload={setReload}
          showForm={showForm}
        />
      )}

      <div className="mt-3">
        <Accordion>
          {!isLoading && (
            <>
              <Accordion.Item eventKey="2">
                <Accordion.Header className="profileSanfona">
                  Quiz de Plantas
                </Accordion.Header>
                <Accordion.Body>
                  <Quiz
                    luminosidade={luminosidade}
                    cuidado={cuidado}
                    setCuidado={setCuidado}
                    setLuminosidade={setLuminosidade}
                    id={user._id}
                    user={user}
                    reload={reload}
                    setReload={setReload}
                  />
                </Accordion.Body>
              </Accordion.Item>
            </>
          )}
        </Accordion>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch",
          flexWrap: "nowrap",
        }}
      >
        <div className="barraSupinpa" style={{ display: "flex" }}>
          <h2 className="AllSub">Crie um Jardim</h2>
          <form onSubmit={handleSubmitGarden}>
            <div style={{ display: "flex", margin: " 10px" }}>
              <label> Nome do jardim </label>

              <input
                name="name"
                value={formGarden.name}
                onChange={handleChange}
              />
            </div>

            <label id="label" htmlFor="formResidence">
              Local:
            </label>
            <select
              required
              id="formSelect"
              name="local"
              onChange={handleChange}
              defaultValue={formGarden.local}
            >
              <option value=""></option>
              <option value="Quintal">Quintal</option>
              <option value="Varanda">Varanda</option>
              <option value="Sala">Sala</option>
              <option value="Quarto">Quarto</option>
              <option value="Cozinha">Cozinha</option>
              <option value="Banheiro">Banheiro</option>
              <option value="Lavanderia">Lavanderia</option>
              <option value="Outro">Outro</option>
            </select>
            <Button
              type="submit"
              className="btn btn-light btn-outline-dark btn-sm me-2"
              style={{
                backgroundColor: "#7C6053",
                color: "white",
                borderColor: "#7C6053",
              }}
            >
              Salvar Jardim
            </Button>
          </form>
        </div>
      </div>
      <div style={{display:"flex", flexDirection:"column", alignItems:"center"}} >
        <h1 className="AllSub" style={{color:"#507849"}} >Meus Jardins</h1>
        {!isLoading &&
          user.garden.map((garden) => {
            const date = new Date(garden.createdAt);

            const dd = date.getDate();
            const mm = date.getMonth() + 1; //janeiro = 0, então precisamos adicionar +1. Isso é só com o mês mesmo.
            const aa = date.getFullYear();

            const hh = date.getHours();
            const min = date.getMinutes();
            console.log(garden);

            return (
              <div>
                <Card style={{ width: "18rem", marginTop: "16px" }}>
                  <Card.Body>
                    <Card.Title>
                      <p className="profileCardTitle">
                        <strong>{garden.name}</strong>
                      </p>
                    </Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      <p className="profileCardSub">
                        <strong>local:</strong> {garden.local}
                      </p>
                    </Card.Subtitle>
                    <Card.Text>
                      <p className="profileCardText">
                        <strong>postado em:</strong> {dd}/{mm}/{aa} - {hh}:{min}{" "}
                      </p>
                    </Card.Text>
                    <Card.Link>
                      <Link
                        to={`/mygarden/${garden._id}`}
                        className="profileCardLink"
                      >
                        Explore seu Jardim
                      </Link>
                    </Card.Link>
                    {garden.comments.length > 0 && <h2>Comentários:</h2>}
                    {garden.comments.map((comments) => {
                      return <p>{comments.content}</p>;
                    })}
                  </Card.Body>
                </Card>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default Profile;
