using CleanArchitecture.Domain.Dtos;
using GenericRepository;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CleanArchitecture.Domain.Repositories;
using Microsoft.EntityFrameworkCore;


namespace CleanArchitecture.Application.Features.EntryFeatures.Commands.DeleteEntry
{
    public sealed class DeleteEntryCommandHandler
        : IRequestHandler<DeleteEntryCommand, MessageResponse>
    {
        private readonly IEntryRepository _entryRepository;
        private readonly IUnitOfWork _unitOfWork;

        public DeleteEntryCommandHandler(
            IEntryRepository entryRepository,
            IUnitOfWork unitOfWork)
        {
            _entryRepository = entryRepository;
            _unitOfWork = unitOfWork;
        }
        public async Task<MessageResponse> Handle(
      DeleteEntryCommand request,
      CancellationToken cancellationToken)
        {
            var entry = await _entryRepository
                .GetAll()
                .Include(x => x.Favorites)
                .FirstOrDefaultAsync(x => x.Id == request.EntryId, cancellationToken);

            if (entry == null)
                throw new Exception("Entry bulunamadı");

            entry.IsDeleted = true;
            entry.DeletedAt = DateTime.UtcNow;

            foreach (var fav in entry.Favorites)
            {
                fav.IsDeleted = true;
                fav.DeletedAt = DateTime.UtcNow;
            }

            _entryRepository.Update(entry);
            await _unitOfWork.SaveChangesAsync(cancellationToken);

            return new MessageResponse("Entry başarıyla silindi");
        }
    }
}


