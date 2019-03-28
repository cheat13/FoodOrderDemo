using System;
using System.Collections.Generic;

namespace FoodApi.Models
{
    public class Order
    {
        public string Id { get; set; }
        public List<Food> Foods { get; set; }
        public int TotalAmount { get; set; }
        public double TotalPrice { get; set; }
        public DateTime Date { get; set; }
    }
}