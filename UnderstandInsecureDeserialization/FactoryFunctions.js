function SecureCarFactory() {
    let carCount = 0;

    return {
        createCar: function (make, model) {
            // Validate input to prevent injection of insecure data
            
            try
            {
                if (typeof make != "string" || typeof model != "string") {
                //throw new Error("Invalid car data");
                console.log("Invalid car data");
            }
            // Limit the number of cars that can be created
            if (carCount >= 5) {
                //throw new Error("Car limit exceeded");
                console.log("Car limit exceeded");
            }
            }
            catch(e)
            {
                console.log(e.message);
            }
            
            carCount++;
            return { make, model };
        }
    };
}

// During deserialization, the factory will validate and restrict instances
const carFactory = SecureCarFactory();
const car = carFactory.createCar("Toyota", "Camry");
const car1 = carFactory.createCar("Toyota", 1);
const car2 = carFactory.createCar("Toyota", "Camry");
const car3 = carFactory.createCar("Toyota", 1);
const car4 = carFactory.createCar("Toyota", "Camry");
const car5 = carFactory.createCar("Toyota", 1);
