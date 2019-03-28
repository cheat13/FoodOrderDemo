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
    public class OrdersController : ControllerBase
    {
        IMongoCollection<Order> Orders { get; set; }
        public OrdersController()
        {
            var settings = MongoClientSettings.FromUrl(new MongoUrl("mongodb://krit_NA:thegigclubna2522@ds125322.mlab.com:25322/kritna"));
            settings.SslSettings = new SslSettings()
            {
                EnabledSslProtocols = SslProtocols.Tls12
            };
            var mongoClient = new MongoClient(settings);
            var database = mongoClient.GetDatabase("kritna");
            Orders = database.GetCollection<Order>("Orders");
        }

        [HttpGet]
        public ActionResult<List<Order>> GetAllOrders()
        {
            return Orders.Find(it => true).ToList();
        }

        [HttpGet("{id}")]
        public ActionResult<Order> GetOrderById(string id)
        {
            var order = Orders.Find(it => it.Id == id).FirstOrDefault();
            return order;
        }

        [HttpPost]
        public void AddOrder([FromBody]Order order)
        {
            order.Id = Guid.NewGuid().ToString();
            order.TotalAmount = order.Foods.Sum(it => it.Amount);
            order.Date = DateTime.Now;
            Orders.InsertOne(order);
        }

        [HttpDelete]
        public void DeleteAllOrders()
        {
            Orders.DeleteMany(it => true);
        }

        [HttpDelete("{id}")]
        public void DeleteOrder(string id)
        {
            Orders.DeleteOne(it => it.Id == id);
        }
    }
}
