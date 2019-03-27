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
    public class OrdersController : ControllerBase
    {
        public static List<Order> Orders = new List<Order>();

        [HttpGet]
        public ActionResult<List<Order>> GetAllOrders()
        {
            return Orders;
        }

        [HttpGet("{id}")]
        public ActionResult<Order> GetOrderById(string id)
        {
            return Orders.FirstOrDefault(it => it.Id == id);
        }

        [HttpPost]
        public void AddOrder([FromBody]Order order)
        {
            order.Id = Guid.NewGuid().ToString();
            order.Date = new DateTime();
            Orders.Add(order);
        }

        [HttpDelete]
        public void DeleteAllOrders()
        {
            Orders = new List<Order>();
        }

        [HttpDelete("{id}")]
        public void DeleteOrder(string id)
        {
            var order = Orders.FirstOrDefault(it => it.Id == id);
            Orders.Remove(order);
        }
    }
}
