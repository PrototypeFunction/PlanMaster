const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const computeFee = (price, call, inProvinceTraffic, nationalTraffic) => {
  const overCall = call - price.callInplan <= 0 ? 0 : call - price.callInplan

  let trafficPerDay = (inProvinceTraffic + nationalTraffic) / 30
  let noInProvinceTrafficDays = 0
  let noNationalTrafficDays = 0
  let noTrafficDays = 30 - (price.trafficInPlan.inProvince + price.trafficInPlan.national) / trafficPerDay
  noTrafficDays = noTrafficDays >= 0 ? noTrafficDays : 0
  if (trafficPerDay > 0) {
    noInProvinceTrafficDays = noTrafficDays * (inProvinceTraffic / (inProvinceTraffic + nationalTraffic)) > 0 ? noTrafficDays * (inProvinceTraffic / (inProvinceTraffic + nationalTraffic)) : 0
    noNationalTrafficDays = noTrafficDays * (nationalTraffic / (inProvinceTraffic + nationalTraffic)) > 0 ? noTrafficDays * (nationalTraffic / (inProvinceTraffic + nationalTraffic)) : 0
  }

  if (price.trafficInPlan.inProvince === 0) {
    inProvinceTraffic = inProvinceTraffic - price.trafficInPlan.national * inProvinceTraffic / (inProvinceTraffic + nationalTraffic)
    nationalTraffic = nationalTraffic - price.trafficInPlan.national * nationalTraffic / (inProvinceTraffic + nationalTraffic)
  } else {
    inProvinceTraffic = inProvinceTraffic - price.trafficInPlan.inProvince
    nationalTraffic = nationalTraffic - price.trafficInPlan.national
  }
  inProvinceTraffic = inProvinceTraffic >= 0 ? inProvinceTraffic : 0
  nationalTraffic = nationalTraffic >= 0 ? nationalTraffic : 0

  if (!price.trafficOutPlanPrice.inProvince) {
    nationalTraffic = inProvinceTraffic + nationalTraffic
    noNationalTrafficDays = noNationalTrafficDays + noInProvinceTrafficDays
    inProvinceTraffic = 0
    noInProvinceTrafficDays = 0
  }

  let fee = price.monthlyFee
  let callFee = overCall * price.callOutPlanPrice
  let trafficFee = 0
  let inProvinceFee = 0
  let nationalFee = 0
  const { inProvince, national, daily } = price.trafficOutPlanPrice

  if (inProvinceTraffic + nationalTraffic > 0) {
    if (inProvince && national) {
      if (inProvince.daily) {
        inProvinceFee = Math.ceil(trafficPerDay / inProvince.quantity) * inProvince.price * noInProvinceTrafficDays
      } else {
        inProvinceFee = Math.ceil(inProvinceTraffic / inProvince.quantity) * inProvince.price
      }
      if (national.daily) {
        nationalFee = Math.ceil(trafficPerDay / national.quantity) * national.price * noNationalTrafficDays
      } else {
        nationalFee = Math.ceil(nationalTraffic / national.quantity) * national.price
      }
    } else if (national) {
      if (national.daily) {
        nationalFee = Math.ceil(trafficPerDay / national.quantity) * national.price * noNationalTrafficDays
      } else {
        nationalFee = Math.ceil(nationalTraffic / national.quantity) * national.price
      }
    }
  }

  trafficFee = nationalFee + inProvinceFee

  return {
    totalFee: (fee + callFee + trafficFee).toFixed(2),
    monthlyFee: price.monthlyFee.toFixed(2),
    callFee: callFee.toFixed(2),
    inProvinceFee: inProvinceFee.toFixed(2),
    nationalFee: nationalFee.toFixed(2),
    trafficFee: trafficFee.toFixed(2),
  }
}

module.exports = {
  formatTime: formatTime,
  computeFee: computeFee,
}
