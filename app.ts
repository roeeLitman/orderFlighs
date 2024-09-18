const BASE_URl: string = "https://66eaef1555ad32cda47b053e.mockapi.io/api/";
const addOrder: HTMLParagraphElement = document.querySelector(
  ".send-order"
) as HTMLParagraphElement;

const tabalOrders: HTMLDivElement = document.querySelector(".order")! 

const getAllFlight = async (): Promise<void> => {
  const res: Response = await fetch(BASE_URl + "flights");
  const flights: Flight[] = await res.json();
  for (const flight of flights) {
    let optionFlight = creatOptiom(flight);
    document.querySelector(".down select")?.appendChild(optionFlight);
  }
};

const creatOptiom = (flight: Flight): HTMLOptionElement => {
  const option: HTMLOptionElement = document.createElement("option");
  option.value = flight.id;
  option.textContent = `from ${flight.from} -> ${flight.to} (${flight.date})`;
  return option;
};

const creatNewOrder = (): Order => {
  return {
    createdAt: new Date().toLocaleDateString(),
    name: (document.querySelector(".name-client") as HTMLInputElement).value,
    gender: (
      document.querySelector(
        "input[type='radio'][name=gender]:checked"
      ) as HTMLInputElement
    ).value,
    flight_id: (document.querySelector(".down select") as HTMLSelectElement)
      .value,
    agent: "Pahshish",
  };
};

const addOrderToServer = async (order: Order): Promise<void> => {
  try {
    const res: Response = await fetch(`${BASE_URl}pasangers`, {
      method: "POST",
      body: JSON.stringify(order),
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(await res.json());
  } catch (err) {
    console.log(err);
  }
};

const refresh = async (): Promise<void> => {
    const res: Response = await fetch(`${BASE_URl}pasangers?agent=Pahshish`)
    const orders: Order[] = await res.json()

    for(const order of orders){
        const htmlOrdere = await creatRowHtml(order)
        console.log(htmlOrdere);
        
        tabalOrders.appendChild(htmlOrdere)
    }
    console.log(await res.json()); 
} 

const creatRowHtml = async(order:Order): Promise<HTMLDivElement> => {
    const res: Response = await fetch(`${BASE_URl}flights/${order.flight_id}`)
    const flight: Flight = await res.json()
    
    const divInformation: HTMLDivElement = document.createElement("div")
    divInformation.classList.add("information")

    const divName: HTMLDivElement = document.createElement("div")
    const pName: HTMLParagraphElement = document.createElement("p")
    pName.textContent = order.name
    divName.classList.add("information-order")
    divName.appendChild(pName)

    const divFlight: HTMLDivElement = document.createElement("div")
    const pFlights: HTMLParagraphElement = document.createElement("p")
    pFlights.textContent = `from: ${flight.from} -> ${flight.to} (${flight.date})`
    divFlight.classList.add("information-order")
    divFlight.appendChild(pFlights)

    const divBottun: HTMLDivElement = document.createElement("div")
    const edit: HTMLParagraphElement = document.createElement("p")
    edit.textContent = "edit"
    const remov: HTMLParagraphElement = document.createElement("p")
    remov.textContent = "remove"
    divBottun.classList.add("edit-bottun")
    divBottun.appendChild(edit)
    divBottun.appendChild(remov)

    divInformation.appendChild(divName)
    divInformation.appendChild(divFlight)
    divInformation.appendChild(divBottun)

    return divInformation
}

addOrder.addEventListener("click", async (e) => {
  const order: Order = creatNewOrder();
  await addOrderToServer(order);
  await refresh();
});

interface Flight {
  date: string;
  from: string;
  to: string;
  id: string;
}

interface Order {
  createdAt: string;
  name: string;
  gender: string;
  flight_id: string;
  agent: string;
}

//סתם בןדק

getAllFlight();
refresh()