import config from './config'

export default (url,data={},method="GET")=>{
  return new Promise((resolve,reject)=>[
    wx.request({
      url: config.host + url,
      data,
      method,
      header:{
        cookie: ['00AD41F5BACB452841FCDDABDEF21C7F2343FD674306006221E817A9C39B7EBA5ADBAA08F429E968A3603B1B78D377DAD8D10FDC641A44CEF7B9F14069C0D5240E13459A32DC8DDCF632BFA4AD1DDB450644C4BDEE5FD5E2AE5672DED3A6613B5F0E4E69987E2D670E0B15A44929AD8322E797D8D8F75D62BE808A56810A4BC9F14D70D9D882492D9794F87C51C5DD4A97A6D54B4082614A8B308B6690D5ED66E10121FEF8C4107C39244DF1D66E8F61786E5CB871EFB2BD1CFF1BF38E04DE8365B1446A0CB7FEA8DE8E0A0878C487D335886CF51CAD4F9AB357C42840F9E47301040C42019D19C259C2A763813157902A140004701316F0AE7E8FCB77C134C48812711A00808590B94C91E82D302152D761C5F4ABA9ED813B6900F374060EBD0AB163C2847B8D8012F5E159B9DE70AFBFD25D729CF0145739842683C4115324D424549960964EC07FC5D87072BC2443C840B44CDEA8A311146BB6783895872C66']
      },
      success: (res)=>{
        console.log('res',res)
        resolve(res.data)
      },
      fail: (err)=>{
        reject(err)
        console.log('err',err)
      }
    })
  ])
}