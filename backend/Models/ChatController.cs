using Microsoft.AspNetCore.Mvc;
using OpenAI.GPT3;
using OpenAI.GPT3.Interfaces;
using OpenAI.GPT3.ObjectModels.RequestModels;
using System.Linq;
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
            
            Console.WriteLine("Received message: " + request?.Message);

            if (string.IsNullOrWhiteSpace(request?.Message))
            {
                return BadRequest(new { error = "Message cannot be empty." });
            }

            
            var chatRequest = new ChatCompletionCreateRequest
            {
                Model = "gpt-3.5-turbo", 
                Messages = new[]
                {
                    new OpenAI.GPT3.ObjectModels.RequestModels.ChatMessage(
                        role: "user",
                        content: request.Message
                    )
                },
                MaxTokens = 300,
                Temperature = 0.7f
            };

            try
            {
                var chatResult = await _openAIService.ChatCompletion.CreateCompletion(chatRequest);

                if (chatResult.Successful)
                {
                    var responseMessage = chatResult.Choices.FirstOrDefault()?.Message.Content.Trim();
                    Console.WriteLine("OpenAI response received: " + responseMessage);
                    return Ok(new { response = responseMessage });
                }
                else
                {
                    Console.WriteLine("OpenAI error: " + chatResult.Error?.Message);
                    return StatusCode(500, new { error = "Error generating response from OpenAI.", details = chatResult.Error?.Message });
                }
            }
            catch (System.Exception ex)
            {
                Console.WriteLine("Unexpected error: " + ex.Message);
                return StatusCode(500, new { error = "An unexpected error occurred.", details = ex.Message });
            }
        }
    }

    public class ChatRequest
    {
        public string Message { get; set; }
    }
}
