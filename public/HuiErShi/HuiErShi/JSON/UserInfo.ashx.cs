using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HuiErShi.JSON
{
    /// <summary>
    /// UserInfo 的摘要说明
    /// </summary>
    public class UserInfo : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            string id = HttpContext.Current.Request.Params["id"];
            context.Response.Write(Convert.ToInt32(id) > 0
                ? "{\"contactAddress\":\"四川省成都市新都区新都大道\",\"adviser\":{\"mobile\":15689984851,\"job\":\"顾问\",\"iconUrl\":\"../../images/2.png\",\"adminNo\":112563,\"roles\":[{\"idCode\":11254,\"name\":\"李三星\"}],\"name\":\"王尚\",\"id\":45},\"idNo\":130688199912053650,\"gender\":\"M\",\"mobile\":15423569887,\"job\":\"售后顾问\",\"iconUrl\":\"../../images/3.png\",\"drinkingSituation\":\"戒酒\",\"sleepSituation\":\"正常\",\"smokingSituation\":\"无\",\"nationality\":\"回族\",\"nativePlace\":\"湖南省长沙市\",\"medicalHistory\":\"心脏搭桥手术\",\"familyMedicalHistory\":\"无\",\"fertility\":\"一个孩子\",\"allergic\":\"青霉素、花粉\",\"vipCard\":{\"activated\":\"时间戳\",\"expiredAt\":\"时间戳\",\"vipCard\":\"时间戳\"},\"id\":1136,\"realName\":\"张顺梅\"}"
                : "1");
        }

        public bool IsReusable
        {
            get
            {
                return false;
            }
        }
    }
}