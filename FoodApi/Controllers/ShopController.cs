using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Authentication;
using System.Threading.Tasks;
using FoodApi.Models;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;

namespace FoodApi.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class ShopController : ControllerBase
    {
        IMongoCollection<Food> Menu { get; set; }
        public ShopController()
        {
            var settings = MongoClientSettings.FromUrl(new MongoUrl("mongodb://krit_NA:thegigclubna2522@ds125322.mlab.com:25322/kritna"));
            settings.SslSettings = new SslSettings()
            {
                EnabledSslProtocols = SslProtocols.Tls12
            };
            var mongoClient = new MongoClient(settings);
            var database = mongoClient.GetDatabase("kritna");
            Menu = database.GetCollection<Food>("Menu");
        }

        [HttpGet]
        public ActionResult<List<Food>> GetMenu()
        {
            return Menu.Find(it => true).ToList();
        }

        [HttpGet("{id}")]
        public ActionResult<Food> GetFood(string id)
        {
            var food = Menu.Find(it => it.Id == id).FirstOrDefault();
            return food;
        }

        [HttpPost]
        public void AddFood([FromBody]Food food)
        {
            food.Id = Guid.NewGuid().ToString();
            Menu.InsertOne(food);
        }

        [HttpPut]
        public void EditFood([FromBody]Food food)
        {
            Menu.ReplaceOne(it => it.Id == food.Id, food);
        }

        [HttpDelete("{id}")]
        public void DeleteFood(string id)
        {
            Menu.DeleteOne(it => it.Id == id);
        }
    }
}
