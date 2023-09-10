export class Machine {
    constructor(machine) {
      this.machine = machine;
      this.product = "";
      this.location = 0;
      this.time = [];
      this.frequency = [];
      this.Speed = [];
      this.Status = [];
      this.status_type = [];
      this.g_change = [];
      this.have_vibration = 0;
      this.is_qualified = [];
      this.good_rate = 100;
      this.accumulativeMin = 0;
  
      this.pred_max_detail = {};
      this.pred_min_detail = {};
      this.pred_avg_detail = {};
      this.standard_max_detail = {};
      this.standard_min_detail = {};
      this.standard_detail_name = {};
  
      this.recommend_speed = [];
      this.recommend_g_change = [];
      this.recommend_frequency = [];
      this.recommend_status = [];
    }
  }
  
export class Repair {
    constructor() {
      this.machine = "";
      this.product = "";
      this.detail_name = "";
      this.pred_time = "";
      this.alarm_status_time = "";
      this.alarm_status = "";
    }
  }
  