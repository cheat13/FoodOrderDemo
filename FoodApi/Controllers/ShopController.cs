using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FoodApi.Models;
using Microsoft.AspNetCore.Mvc;

namespace FoodApi.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class ShopController : ControllerBase
    {
        public static List<Food> Menu = new List<Food>
        {
            new Food{
                Id = Guid.NewGuid().ToString(),
                Name = "สเต๊กเนื้อ",
                Price = 129,
                Description = "เนื้อชั้นดี เบอร์ตอง",
                CookingTime = 10 ,
                Image = "../../assets/imgs/image003.jpg"
            },
            new Food{
                Id = Guid.NewGuid().ToString(),
                Name = "สเต๊กหมู",
                Price = 99,
                Description = "หมูชั้นดี เบอร์ตอง",
                CookingTime = 10,
                Image = "../../assets/imgs/02_20150122172551GLWY.jpg"
            },
            new Food{
                Id = Guid.NewGuid().ToString(),
                Name = "สปาเก็ตตี้ผัดพริกแห้ง",
                Price = 89,
                Description = "เส้นเหนียวนุ่ม เผ็ดร้อน หอมกลิ่นพริก  ",
                CookingTime = 10,
                Image = "../../assets/imgs/spagetty.jpg"
            },
            new Food{
                Id = Guid.NewGuid().ToString(),
                Name = "ผักโขมอบชีส",
                Price = 89,
                Description = " หวาน หอม กรอบ อร่อย",
                CookingTime = 10,
                Image = "../../assets/imgs/1379138109381.jpg"
            }
        };

        [HttpGet]
        public ActionResult<List<Food>> GetMenu()
        {
            return Menu;
        }

        [HttpGet("{id}")]
        public ActionResult<Food> GetFood(string id)
        {
            return Menu.FirstOrDefault(it => it.Id == id);
        }

        [HttpPost]
        public void AddFood([FromBody]Food food)
        {
            food.Id = Guid.NewGuid().ToString();
            Menu.Add(food);
        }

        [HttpPut]
        public void EditFood([FromBody]Food newFood)
        {
            var oldFood = Menu.FirstOrDefault(it => it.Id == newFood.Id);
            Menu.Remove(oldFood);
            Menu.Add(newFood);
        }

        [HttpDelete("{id}")]
        public void DeleteFood(string id)
        {
            var food = Menu.FirstOrDefault(it => it.Id == id);
            Menu.Remove(food);
        }
    }
}
