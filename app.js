"use strict";
const BASE_URl = "https://66eaef1555ad32cda47b053e.mockapi.io/api/";
const addOrder = document.querySelector(".send-order");
const tabalOrders = document.querySelector(".order");
const getAllFlight = async () => {
    var _a;
    const res = await fetch(BASE_URl + "flights");
    const flights = await res.json();
    for (const flight of flights) {
        let optionFlight = creatOptiom(flight);
        (_a = document.querySelector(".down select")) === null || _a === void 0 ? void 0 : _a.appendChild(optionFlight);
    }
};
const creatOptiom = (flight) => {
    const option = document.createElement("option");
    option.value = flight.id;
    option.textContent = `from ${flight.from} -> ${flight.to} (${flight.date})`;
    return option;
};
const creatNewOrder = () => {
    return {
        createdAt: new Date().toLocaleDateString(),
        name: document.querySelector(".name-client").value,
        gender: document.querySelector("input[type='radio'][name=gender]:checked").value,
        flight_id: document.querySelector(".down select")
            .value,
        agent: "Pahshish",
    };
};
const addOrderToServer = async (order) => {
    try {
        const res = await fetch(`${BASE_URl}pasangers`, {
            method: "POST",
            body: JSON.stringify(order),
            headers: {
                "Content-Type": "application/json",
            },
        });
        console.log(await res.json());
    }
    catch (err) {
        console.log(err);
    }
};
const refresh = async () => {
    const res = await fetch(`${BASE_URl}pasangers?agent=Pahshish`);
    const orders = await res.json();
    tabalOrders.innerHTML = "";
    for (const order of orders) {
        const htmlOrdere = await creatRowHtml(order);
        console.log(htmlOrdere);
        tabalOrders.appendChild(htmlOrdere);
    }
};
const creatRowHtml = async (order) => {
    const res = await fetch(`${BASE_URl}flights/${order.flight_id}`);
    const flight = await res.json();
    const divInformation = document.createElement("div");
    divInformation.classList.add("information");
    const divName = document.createElement("div");
    const pName = document.createElement("p");
    pName.textContent = order.name;
    divName.classList.add("information-order");
    divName.appendChild(pName);
    const divFlight = document.createElement("div");
    const pFlights = document.createElement("p");
    pFlights.textContent = `from: ${flight.from} -> ${flight.to} (${flight.date})`;
    divFlight.classList.add("information-order");
    divFlight.appendChild(pFlights);
    const divBottun = document.createElement("div");
    const edit = document.createElement("p");
    edit.textContent = "edit";
    edit.addEventListener("click", () => {
        document.querySelector(".edit-order").style.display =
            "flex";
    });
    const remov = document.createElement("p");
    remov.textContent = "remove";
    remov.addEventListener("click", async () => {
        await removFromServer(order.id);
        await refresh();
    });
    divBottun.classList.add("edit-bottun");
    divBottun.appendChild(edit);
    divBottun.appendChild(remov);
    divInformation.appendChild(divName);
    divInformation.appendChild(divFlight);
    divInformation.appendChild(divBottun);
    return divInformation;
};
const removFromServer = async (id) => {
    const res = await fetch(BASE_URl + "pasangers/" + id, {
        method: "DELETE",
    });
};
addOrder.addEventListener("click", async (e) => {
    const order = creatNewOrder();
    await addOrderToServer(order);
    await refresh();
});
//סתם בןדק
getAllFlight();
refresh();
