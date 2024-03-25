using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Profile = Application.Profiles.Profile;
using AutoMapper;
using MediatR;
using Persistence;
using Application.Core;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;
using Application.Interfaces;

namespace Application.Followers
{
    public class List
    {
        public class Query : IRequest<Result<List<Profile>>>
        {
            public string Predicate { get; set; }
            public string Username { get; set; }


        }

        public class Handler : IRequestHandler<Query, Result<List<Profile>>>
        {
            private readonly DataContext _dataContext;
            private readonly IMapper _mapper;
            private readonly IUserAccessor _userAccessor;
            public Handler(DataContext dataContext, IMapper mapper, IUserAccessor userAccessor)
            {
                _userAccessor = userAccessor;
                _mapper = mapper;
                _dataContext = dataContext;
            }

            public async Task<Result<List<Profile>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var profiles = new List<Profile>();

                switch (request.Predicate)
                {
                    case "followers":
                        profiles = await _dataContext.UserFollowings.Where(x => x.Target.UserName == request.Username)
                        .Select(u => u.Observer)
                        .ProjectTo<Profile>(_mapper.ConfigurationProvider, new { currentUsername = _userAccessor.GetUserName() })
                        .ToListAsync();
                        break;
                    case "following":
                        profiles = await _dataContext.UserFollowings.Where(x => x.Observer.UserName == request.Username)
                        .Select(u => u.Target)
                        .ProjectTo<Profile>(_mapper.ConfigurationProvider, new { currentUsername = _userAccessor.GetUserName() })
                        .ToListAsync();
                        break;
                    default:
                        break;
                }

                return Result<List<Profile>>.Success(profiles);

            }
        }
    }
}