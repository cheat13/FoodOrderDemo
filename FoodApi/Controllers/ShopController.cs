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
                CookingTime = 10
            },
            new Food{
                Id = Guid.NewGuid().ToString(),
                Name = "สเต๊กหมู",
                Price = 99,
                Description = "หมูชั้นดี เบอร์ตอง",
                CookingTime = 10
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
