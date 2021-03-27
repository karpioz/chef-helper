let rota = [
  {
    _id: "605e0b19e2c9374998625ae9",
    weeklyRota: [
      {
        _id: "605e0b19e2c9374998625aea",
        dayId: 0,
        day: "Monday",
        date: "Monday, March 22, 2021 12:00 AM",
        employees: [
          {
            isOff: false,
            _id: "605e0b19e2c9374998625aeb",
            start: "07:30",
            finish: "17:00",
          },
          {
            isOff: false,
            _id: "605e0b19e2c9374998625aec",
            start: "12:00",
            finish: "22:00",
          },
        ],
      },
      {
        _id: "605e0b19e2c9374998625aed",
        dayId: 1,
        day: "Tuesday",
        date: "Tuesday, March 23, 2021 12:00 AM",
        employees: [
          {
            isOff: false,
            _id: "605e0b19e2c9374998625aee",
            start: "07:30",
            finish: "17:00",
          },
          {
            isOff: false,
            _id: "605e0b19e2c9374998625aef",
            start: "12:00",
            finish: "22:00",
          },
        ],
      },
      {
        _id: "605e0b19e2c9374998625af0",
        dayId: 2,
        day: "Wednesday",
        date: "Wednesday, March 24, 2021 12:00 AM",
        employees: [
          {
            isOff: false,
            _id: "605e0b19e2c9374998625af1",
            start: "07:30",
            finish: "17:00",
          },
          {
            isOff: false,
            _id: "605e0b19e2c9374998625af2",
            start: "12:00",
            finish: "22:00",
          },
        ],
      },
      {
        _id: "605e0b19e2c9374998625af3",
        dayId: 3,
        day: "Thursday",
        date: "Thursday, March 25, 2021 12:00 AM",
        employees: [
          {
            isOff: false,
            _id: "605e0b19e2c9374998625af4",
            start: "07:30",
            finish: "17:00",
          },
          {
            isOff: false,
            _id: "605e0b19e2c9374998625af5",
            start: "12:00",
            finish: "22:00",
          },
        ],
      },
      {
        _id: "605e0b19e2c9374998625af6",
        dayId: 4,
        day: "Friday",
        date: "Friday, March 26, 2021 12:00 AM",
        employees: [
          {
            isOff: false,
            _id: "605e0b19e2c9374998625af7",
            start: "07:30",
            finish: "17:00",
          },
          {
            isOff: false,
            _id: "605e0b19e2c9374998625af8",
            start: "12:00",
            finish: "22:00",
          },
        ],
      },
      {
        _id: "605e0b19e2c9374998625af9",
        dayId: 5,
        day: "Saturday",
        date: "Saturday, March 27, 2021 12:00 AM",
        employees: [
          {
            isOff: false,
            _id: "605e0b19e2c9374998625afa",
            start: "07:30",
            finish: "17:00",
          },
          {
            isOff: false,
            _id: "605e0b19e2c9374998625afb",
            start: "12:00",
            finish: "22:00",
          },
          {
            isOff: false,
            _id: "605e0b19e2c9374998625afc",
            start: "10:00",
            finish: "21:00",
          },
        ],
      },
      {
        _id: "605e0b19e2c9374998625afd",
        dayId: 6,
        day: "Sunday",
        date: "Sunday, March 28, 2021 12:00 AM",
        employees: [
          {
            isOff: false,
            _id: "605e0b19e2c9374998625afe",
            start: "07:30",
            finish: "17:00",
          },
          {
            isOff: false,
            _id: "605e0b19e2c9374998625aff",
            start: "12:00",
            finish: "22:00",
          },
          {
            isOff: false,
            _id: "605e0b19e2c9374998625b00",
            start: "10:00",
            finish: "21:00",
          },
        ],
      },
    ],
    weekStart: "Monday, March 22, 2021 12:00 AM",
    createdAt: "2021-03-26T16:26:01.134Z",
    updatedAt: "2021-03-26T16:26:01.134Z",
    __v: 0,
  },
];

let employees = [...rota[0].weeklyRota[0].employees];

console.log(employees);

//console.log(employeeId)

const isWorking = (emp, day) => {
  let isWorking = false;
  let employees = rota[0].weeklyRota[day].employees[0]["_id"];
  console.log("emp: " + emp);
  console.log("employees Id " + employees);
  if (emp === employees) isWorking = true;
  return isWorking;
};

//console.log(isWorking("605dc314aa51175a940b579f", 0))

employees.forEach((e, i) => console.log(isWorking(e._id, i)));
