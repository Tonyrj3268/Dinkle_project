// <DoubleLineChart></DoubleLineChart>
class Machine {
    constructor(machine) {
      this.machine = machine;
      this.product = "";
      this.time = [];
      this.frequency = [];
      this.Speed = [];
      this.Status = [];
      this.g_change = [];
      this.have_transient = [];
      this.is_qualified = [];
      this.good_rate = 100
      this.pred_avg_detail_1 = [];
      this.pred_avg_detail_2 = [];
      this.pred_avg_detail_3 = [];
      this.pred_avg_detail_4 = [];
      this.pred_avg_detail_5 = [];
      this.pred_avg_detail_6 = [];
      this.pred_avg_detail_7 = [];
      this.pred_avg_detail_8 = [];
      this.pred_avg_detail_9 = [];
      this.pred_avg_detail_10 = [];
      this.pred_avg_detail_11 = [];
      this.pred_avg_detail_12 = [];
      this.pred_avg_detail_13 = [];
      this.standard_max_detail_1 = 0;
      this.standard_max_detail_2 = 0;
      this.standard_max_detail_3 = 0;
      this.standard_max_detail_4 = 0;
      this.standard_max_detail_5 = 0;
      this.standard_max_detail_6 = 0;
      this.standard_max_detail_7 = 0;
      this.standard_max_detail_8 = 0;
      this.standard_max_detail_9 = 0;
      this.standard_max_detail_10 = 0;
      this.standard_max_detail_11 = 0;
      this.standard_max_detail_12 = 0;
      this.standard_max_detail_13 = 0;
      this.standard_min_detail_1 = 3;
      this.standard_min_detail_2 = 2;
      this.standard_min_detail_3 = 6;
      this.standard_min_detail_4 = 2;
      this.standard_min_detail_5 = 2;
      this.standard_min_detail_6 = 3;
      this.standard_min_detail_7 = 2;
      this.standard_min_detail_8 = 0;
      this.standard_min_detail_9 = 0;
      this.standard_min_detail_10 = 0;
      this.standard_min_detail_11 = 0;
      this.standard_min_detail_12 = 0;
      this.standard_min_detail_13 = 0;
    }
  }

var api_data = [
    {
        "time": "2023-04-24 17:12:10",
        "machine": "D-005",
        "product": "0162B00100-S",
        "shift": "白班",
        "frequency": 5.4167,
        "Speed": 321,
        "Status": 2,
        "x_change": 1050.2738,
        "y_change": 1354.9321,
        "z_change": 1346.9975,
        "g_change": 76274.4711,
        "pred_max_detail_1": 3.2886,
        "pred_max_detail_2": 2.2516,
        "pred_max_detail_3": 6.2279,
        "pred_max_detail_4": 2.7069,
        "pred_max_detail_5": 2.2338,
        "pred_max_detail_6": 3.3046,
        "pred_max_detail_7": 2.4583,
        "pred_max_detail_8": 0.4045,
        "pred_max_detail_9": 0.59,
        "pred_max_detail_10": 0.5852,
        "pred_max_detail_11": 0.5768,
        "pred_max_detail_12": 0.5948,
        "pred_max_detail_13": 0.5836,
        "pred_min_detail_1": 3.2708,
        "pred_min_detail_2": 2.2333,
        "pred_min_detail_3": 6.1929,
        "pred_min_detail_4": 2.6931,
        "pred_min_detail_5": 2.22,
        "pred_min_detail_6": 3.287,
        "pred_min_detail_7": 2.4235,
        "pred_min_detail_8": 0.4043,
        "pred_min_detail_9": 0.5606,
        "pred_min_detail_10": 0.5596,
        "pred_min_detail_11": 0.5731,
        "pred_min_detail_12": 0.5746,
        "pred_min_detail_13": 0.5399,
        "have_transient": 1,
        "standard_max_detail_1": 3.35,
        "standard_max_detail_2": 2.3,
        "standard_max_detail_3": 6.3,
        "standard_max_detail_4": 2.77,
        "standard_max_detail_5": 2.3,
        "standard_max_detail_6": 3.37,
        "standard_max_detail_7": 2.54,
        "standard_max_detail_8": 0.42,
        "standard_max_detail_9": 0.63,
        "standard_max_detail_10": 0.63,
        "standard_max_detail_11": 0.63,
        "standard_max_detail_12": 0.63,
        "standard_max_detail_13": 0.63,
        "standard_min_detail_1": 3.25,
        "standard_min_detail_2": 2.2,
        "standard_min_detail_3": 6.14,
        "standard_min_detail_4": 2.63,
        "standard_min_detail_5": 2.1,
        "standard_min_detail_6": 3.23,
        "standard_min_detail_7": 2.34,
        "standard_min_detail_8": 0.38,
        "standard_min_detail_9": 0.53,
        "standard_min_detail_10": 0.53,
        "standard_min_detail_11": 0.53,
        "standard_min_detail_12": 0.53,
        "standard_min_detail_13": 0.53
    },
    {
        "time": "2023-04-24 17:12:10",
        "machine": "D-003",
        "product": "0070B00100",
        "shift": "白班",
        "frequency": 5.4167,
        "Speed": 321,
        "Status": 2,
        "x_change": 1050.2738,
        "y_change": 1354.9321,
        "z_change": 1346.9975,
        "g_change": 76274.4711,
        "pred_max_detail_1": 3.2886,
        "pred_max_detail_2": 2.2516,
        "pred_max_detail_3": 6.2279,
        "pred_max_detail_4": 2.7069,
        "pred_max_detail_5": 2.2338,
        "pred_max_detail_6": 3.3046,
        "pred_max_detail_7": 2.4583,
        "pred_max_detail_8": 0.4045,
        "pred_max_detail_9": 0.59,
        "pred_max_detail_10": 0.5852,
        "pred_max_detail_11": 0.5768,
        "pred_max_detail_12": 0.5948,
        "pred_max_detail_13": 0.5836,
        "pred_min_detail_1": 3.2708,
        "pred_min_detail_2": 2.2333,
        "pred_min_detail_3": 6.1929,
        "pred_min_detail_4": 2.6931,
        "pred_min_detail_5": 2.22,
        "pred_min_detail_6": 3.287,
        "pred_min_detail_7": 2.4235,
        "pred_min_detail_8": 0.4043,
        "pred_min_detail_9": 0.5606,
        "pred_min_detail_10": 0.5596,
        "pred_min_detail_11": 0.5731,
        "pred_min_detail_12": 0.5746,
        "pred_min_detail_13": 0.5399,
        "have_transient": 1,
        "standard_max_detail_1": 3.35,
        "standard_max_detail_2": 2.3,
        "standard_max_detail_3": 6.3,
        "standard_max_detail_4": 2.77,
        "standard_max_detail_5": 2.3,
        "standard_max_detail_6": 3.37,
        "standard_max_detail_7": 2.54,
        "standard_max_detail_8": 0.42,
        "standard_max_detail_9": 0.63,
        "standard_max_detail_10": 0.63,
        "standard_max_detail_11": 0.63,
        "standard_max_detail_12": 0.63,
        "standard_max_detail_13": 0.63,
        "standard_min_detail_1": 3.25,
        "standard_min_detail_2": 2.2,
        "standard_min_detail_3": 6.14,
        "standard_min_detail_4": 2.63,
        "standard_min_detail_5": 2.1,
        "standard_min_detail_6": 3.23,
        "standard_min_detail_7": 2.34,
        "standard_min_detail_8": 0.38,
        "standard_min_detail_9": 0.53,
        "standard_min_detail_10": 0.53,
        "standard_min_detail_11": 0.53,
        "standard_min_detail_12": 0.53,
        "standard_min_detail_13": 0.53
    }
]

var machines = []
var passRate=[]
setInterval(() => {
    // 從陣列中獲取資料
    let all_good_rate = 0
    for (let i = 0; i < api_data.length; i++) {
        let json = api_data[i];
        let foundObject = false;
    
        machines.forEach(obj => {
            if (obj.machine === json.machine) {
                foundObject = true;
                if (obj.product != json.product){
                    obj = new Machine(json.machine);
                    obj.product = json.product
                }

                if (obj.Status.length > 100) {
                    Object.keys(obj).forEach(key => {
                        if (Array.isArray(obj[key])) {
                            obj[key].shift();
                        }
                      });
                }
                obj.time.push(json.time)
                obj.frequency.push(json.frequency);
                obj.Speed.push(json.Speed);
                obj.Status.push(json.Status);
                obj.g_change.push(json.g_change);
                obj.have_transient.push(json.have_transient);
                let is_qualified = true
                for (let i = 1; i <= 13; i++) {
                    let detailName = `detail_${i}`;
                    obj[`pred_avg_${detailName}`].push(Number(((json[`standard_max_${detailName}`]+json[`standard_min_${detailName}`])/2).toFixed(2)));
                    obj[`standard_max_${detailName}`] = json[`standard_max_${detailName}`];
                    obj[`standard_min_${detailName}`] = json[`standard_min_${detailName}`]; 

                    if (obj[`pred_avg_${detailName}`] > obj[`standard_max_${detailName}`] || obj[`pred_avg_${detailName}`] < obj[`standard_min_${detailName}`]){
                        is_qualified = false
                    }
                }
                obj.is_qualified.push(is_qualified);
                let good= obj.is_qualified.reduce((acc, cur) => acc + (cur ? 1 : 0), 0)
                let good_rate = Number((good / obj.is_qualified.length).toFixed(2));
                obj.good_rate = good_rate;
                all_good_rate += good_rate;
            
          }
        })

        if(!foundObject){
            let is_qualified = true
            let machine = new Machine(json.machine);
            machine.product = json.product
            machine.time.push(json.time)
            machine.frequency.push(json.frequency);
            machine.Speed.push(json.Speed);
            machine.Status.push(json.Status);
            machine.g_change.push(json.g_change);
            machine.have_transient.push(json.have_transient);
            for (let i = 1; i <= 13; i++) {
                let detailName = `detail_${i}`;
                machine[`pred_avg_${detailName}`].push(Number(((json[`standard_max_${detailName}`]+json[`standard_min_${detailName}`])/2).toFixed(2)));
                machine[`standard_max_${detailName}`] = json[`standard_max_${detailName}`];
                machine[`standard_min_${detailName}`] = json[`standard_min_${detailName}`];

                if (machine[`pred_avg_${detailName}`] > machine[`standard_max_${detailName}`] || machine[`pred_avg_${detailName}`] < machine[`standard_min_${detailName}`]){
                    is_qualified = false
                }
            }
            machine.is_qualified.push(is_qualified);
            let good= machine.is_qualified.reduce((acc, cur) => acc + (cur ? 1 : 0), 0)
            let good_rate = Number((good / machine.is_qualified.length).toFixed(2));
            machine.good_rate = good_rate;
            all_good_rate += good_rate;
            
            machines.push(machine);
        }
    }
    passRate.push(all_good_rate/api_data.length*100)
        
}, 1000);