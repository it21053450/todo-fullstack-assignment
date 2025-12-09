using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Todo.Api.Data;
using Todo.Api.Models;

namespace Todo.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TasksController : ControllerBase
    {
        private readonly AppDbContext _context;

        public TasksController(AppDbContext context)
        {
            _context = context;
        }

        //  Create a task
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] TodoTask task)
        {
            if (string.IsNullOrWhiteSpace(task.Title))
                return BadRequest("Title is required");

            task.CreatedAt = DateTime.UtcNow;
            task.IsCompleted = false;

            _context.Tasks.Add(task);
            await _context.SaveChangesAsync();

            return Ok(task);
        }

        //  Get latest 5 pending tasks
        [HttpGet]
        public async Task<IActionResult> GetLatest()
        {
            var tasks = await _context.Tasks
                .Where(t => !t.IsCompleted)
                .OrderByDescending(t => t.CreatedAt)
                .Take(5)
                .ToListAsync();

            return Ok(tasks);
        }

        //  Mark task as completed
        [HttpPut("{id}/done")]
        public async Task<IActionResult> MarkDone(int id)
        {
            var task = await _context.Tasks.FindAsync(id);
            if (task == null) return NotFound();

            task.IsCompleted = true;
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
