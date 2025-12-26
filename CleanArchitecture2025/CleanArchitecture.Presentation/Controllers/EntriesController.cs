namespace CleanArchitecture.Presentation.Controllers
{
    using global::CleanArchitecture.Application.Features.EntryFeatures.Commands.DeleteEntry;
    using global::CleanArchitecture.Domain.Dtos;
    using global::CleanArchitecture.Presentation.Abstraction;
    using MediatR;
    using Microsoft.AspNetCore.Mvc;

    namespace CleanArchitecture.Presentation.Controllers
    {
        public sealed class EntriesController : ApiController
        {
            public EntriesController(IMediator mediator) : base(mediator) { }

            // DELETE: api/entries/{id}
            [HttpDelete("{id}")]
            public async Task<IActionResult> Delete(int id, CancellationToken cancellationToken)
            {
                MessageResponse response = await _mediator.Send(
                    new DeleteEntryCommand(id),
                    cancellationToken);

                return Ok(response);
            }
        }
    }

}
