using CleanArchitecture.Domain.Dtos;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CleanArchitecture.Application.Features.EntryFeatures.Commands.DeleteEntry
{
    public sealed class DeleteEntryCommand : IRequest<MessageResponse>
    {
        public int EntryId { get; set; }

        public DeleteEntryCommand(int entryId)
        {
            EntryId = entryId;
        }
    }
}

