using Microsoft.AspNetCore.Mvc;
using OpenAI.GPT3;
using OpenAI.GPT3.Interfaces;
using OpenAI.GPT3.ObjectModels.RequestModels;
using System.Threading.Tasks;

namespace Projekt4.Controllers
{
    [ApiController]
    [Route("api/chat")]
    public class ChatController : ControllerBase
    {
        private readonly IOpenAIService _openAIService;

        public ChatController(IOpenAIService openAIService)
        {
            _openAIService = openAIService;
        }

        [HttpPost]
        public async Task<IActionResult> Chat([FromBody] ChatRequest request)
        {
            if (string.IsNullOrWhiteSpace(request.Message))
            {
                return BadRequest(new { error = "Message cannot be empty." });
            }

            var completionRequest = new CompletionCreateRequest
            {
                Model = OpenAI.GPT3.ObjectModels.Models.TextDavinciV3,
                Prompt = request.Message,
                MaxTokens = 300,
                Temperature = 0.7f
            };

            var completionResult = await _openAIService.Completions.CreateCompletion(completionRequest);

            if (completionResult.Successful)
            {
                return Ok(new { response = completionResult.Choices.FirstOrDefault()?.Text.Trim() });
            }
            else
            {
                return StatusCode(500, new { error = "Error generating response from OpenAI." });
            }
        }
    }

    public class ChatRequest
    {
        public string Message { get; set; }
    }
}
